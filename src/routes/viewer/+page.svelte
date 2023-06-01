<script lang="ts">
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {AccordionGroup, AccordionItem, ProgressRadial} from "@brainandbones/skeleton";
    import FakeProgress from "$lib/FakeProgress.svelte";
    import ViewerData from "$lib/ViewerData.svelte";
    import InlinePlayer from "$lib/InlinePlayer.svelte";
    import DateStamp from "$lib/DateStamp.svelte";
	import type { ExportData } from "$lib/utils";
    import {getContext} from "svelte";
    import {page} from "$app/stores";

    const searchId = $page.url.searchParams.get("id");

    let id: string;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let exportData: Promise<ExportData> = new Promise(() => {});
    if(browser && !(location.hash || getContext("fileData").get() || searchId)) {
        goto("/")
    } else if(!browser || searchId) {
        if(searchId) {
            id = searchId;
            exportData = fetch("https://bytebin.ajg0702.us/" + id).then(r => r.json())
        }
    } else if(browser) {
        id = location.hash.substring(1);
        if(location.hash) {
            exportData = fetch("https://bytebin.ajg0702.us/" + id).then(r => r.json())
        } else {
            exportData = getContext("fileData").get()
        }
    }
</script>
<style>
    .big-page {
        padding-bottom: 20em;
    }
</style>
<div class="text-center big-page">
    {#if !browser}
        <div class="flex items-center h-screen">
            <div class="mx-auto h-24 w-24">
                <ProgressRadial/>
            </div>
        </div>
    {:else}
        <div class="mx-auto">
            {#await exportData}
                <div class="flex items-center h-screen">
                    <div class="mx-auto h-24 w-24">
                        <FakeProgress/>
                    </div>
                </div>
            {:then data}
                <br>
                <h2>Click a board below to see the data in that board</h2>
                {#if data.meta}
                    Taken by <InlinePlayer name={data.meta.taker.name} uuid={data.meta.taker.uuid}/>
                    <br>
                    <DateStamp epochSeconds={data.meta.datestamp/1000}/>
                    <br>
                    ajLeaderboards v{data.meta.version}
                {/if}
                <br>
                <br>
                <hr>
                <br>
                <AccordionGroup>
                    {#each Object.entries(data).filter(e => e[0] !== "meta") as [board, d]}
                        <AccordionItem>
                            <svelte:fragment slot="summary">
                                {board}
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                <ViewerData data={d} {board}/>
                            </svelte:fragment>
                        </AccordionItem>
                    {/each}
                </AccordionGroup>

            {/await}
        </div>
    {/if}
</div>