<script>
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {ProgressRadial} from "@brainandbones/skeleton";

    if(browser && location.hash) {
        goto("/viewer" + location.hash);
    }
</script>

<div class="flex items-center h-screen">
    <div class="mx-auto p-2 text-center">
        {#if browser && !location.hash}
            To use the viewer, generate a link using <code>/ajlb&nbsp;viewer</code> in-game
        {:else}
            <div class="h-24 w-24">
                <ProgressRadial/>
            </div>
        {/if}
    </div>
</div>