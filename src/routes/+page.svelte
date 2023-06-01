<script lang="ts">
    import {browser, building} from "$app/environment";
    import {goto} from "$app/navigation";
    import {FileDropzone, ProgressRadial} from "@brainandbones/skeleton";
    import {getContext} from "svelte";
    import {page} from "$app/stores";

    const searchId = building ? undefined : $page.url.searchParams.get("id");


    if(browser && (location.hash || searchId)) {
        if(location.hash) {
            goto("/viewer?id=" + location.hash.substring(1));
        } else if(searchId) {
            goto("/viewer?id=" + searchId);
        }
    }

    let errorText = "";

    let fileData = getContext("fileData");

    let files;
    $: if(files) files[0].text()
        .then(text => JSON.parse(text))
        .then(data => fileData.set(data))
        .then(() => goto("/viewer"))
        .catch(e => {
            errorText = "Unable to parse the file you provided. Is it a valid JSON export file from ajLeaderboards?";
            console.error(e);
        });
</script>

<div class="flex items-center h-screen">
    <div class="mx-auto p-2 text-center">
        {#if browser && !location.hash}
            To use the viewer, generate a link using <code>/ajlb&nbsp;viewer</code> in-game<br>
            or<br>
            <FileDropzone bind:files accept="application/json"/>
            {#if errorText}
                {errorText}<br>
            {/if}
        {:else}
            <div class="h-24 w-24">
                <ProgressRadial/>
            </div>
        {/if}
    </div>
</div>