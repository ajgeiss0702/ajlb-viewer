<script lang="ts">
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {AccordionGroup, AccordionItem, ProgressRadial} from "@brainandbones/skeleton";
    import FakeProgress from "$lib/FakeProgress.svelte";
    import ViewerData from "$lib/ViewerData.svelte";

    let id;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let exportData = new Promise(() => {});
    if(browser && !location.hash) {
        goto("/")
    } else if(browser) {
        id = location.hash.substring(1);
        exportData = fetch("https://paste.ajg0702.us/" + id).then(r => r.json());
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
                <br>
                <br>
                <AccordionGroup>
                    {#each Object.entries(data) as [board, d]}
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