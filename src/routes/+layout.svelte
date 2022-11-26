<script lang="ts">
    import '@brainandbones/skeleton/themes/theme-skeleton.css';
    import '@brainandbones/skeleton/styles/all.css';
    import '../app.postcss';
    import {writable, type Writable} from "svelte/store";
    import CommitInfo from "$lib/CommitInfo.svelte";

    const sideTab: Writable<number> = writable(1);
</script>

<div style="min-height: calc(100vh - 1.5rem)">
    <slot/>
</div>
<div>

</div>