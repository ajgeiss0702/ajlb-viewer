<script lang="ts">
    import '@brainandbones/skeleton/themes/theme-skeleton.css';
    import '@brainandbones/skeleton/styles/all.css';
    import '../app.postcss';
    import {setContext} from "svelte";
    import {type ExportData} from "../lib/utils";

    let fileData: ExportData;

    setContext("fileData", {
        get: () => fileData,
        set: data => fileData = data
    });
</script>

<div style="min-height: calc(100vh - 1.5rem)">
    <slot/>
</div>
<div>

</div>