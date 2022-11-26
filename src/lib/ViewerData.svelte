<script lang="ts">
    import {writable, type Writable} from "svelte/store";
    import {
        Avatar,
        type DataTableModel,
        dataTableHandler,
        dataTableSelectAll,
        dataTableSort,
        tableInteraction,
        tableA11y, Paginator
    } from "@brainandbones/skeleton";

    export let data;
    export let board;

    const dataTableModel: Writable<DataTableModel> = writable({
        source: data,
        filtered: data,
        selection: [],
        search: '',
        sort: '',
        pagination: { offset: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10, 20, 50, 100, 200, 500] }
    });
    dataTableModel.subscribe((v) => dataTableHandler(v));
</script>
<!-- Table -->
<section class="card !bg-accent-500/5">
    <div class="card-header">
        <input bind:value={$dataTableModel.search} class="p-2" type="search" placeholder="Search {board}..." />
    </div>
    <div class="card-body text-left">
        <div class="table-container">
            <!-- prettier-ignore -->
            <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                <thead on:click={(e) => { dataTableSort(e, dataTableModel) }} on:keypress>
                <tr>
                    <th data-sort="id">UUID</th>
                    <th>User</th>
                    <th data-sort="namecache">Name / Display Name (cached)</th>
                    <th data-sort="value">Value</th>
                    <th data-sort="hourly_delta">Hourly (delta / lasttotal)</th>
                    <th data-sort="daily_delta">Daily (delta / lasttotal)</th>
                    <th data-sort="weekly_delta">Weekly (delta / lasttotal)</th>
                    <th data-sort="monthly_delta">Monthly (delta / lasttotal)</th>
                    <th data-sort="yearly_delta">Yearly (delta / lasttotal)</th>
                    <th class="table-cell-fit"></th>
                </tr>
                </thead>
                <tbody>
                {#each $dataTableModel.filtered as row, rowIndex}
                    <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                        <td role="gridcell" aria-colindex={1} tabindex="0">
                            <em class="opacity-50">{row.id}</em>
                        </td>
                        <td role="gridcell" aria-colindex={2} tabindex="0">
                            <Avatar src={`https://crafatar.com/avatars/${row.id}`} width="w-8" />
                        </td>
                        <td role="gridcell" aria-colindex={3} tabindex="0" class="md:!whitespace-normal">
                            {row.namecache} / {row.displaynamecache}
                        </td>
                        <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal">
                            {row.value}
                        </td>

                        <td role="gridcell" aria-colindex={5} tabindex="0" class="md:!whitespace-normal">
                            {row.hourly_delta} / {row.hourly_lasttotal}
                        </td>
                        <td role="gridcell" aria-colindex={6} tabindex="0" class="md:!whitespace-normal">
                            {row.daily_delta} / {row.daily_lasttotal}
                        </td>
                        <td role="gridcell" aria-colindex={7} tabindex="0" class="md:!whitespace-normal">
                            {row.weekly_delta} / {row.weekly_lasttotal}
                        </td>
                        <td role="gridcell" aria-colindex={8} tabindex="0" class="md:!whitespace-normal">
                            {row.monthly_delta} / {row.monthly_lasttotal}
                        </td>
                        <td role="gridcell" aria-colindex={9} tabindex="0" class="md:!whitespace-normal">
                            {row.yearly_delta} / {row.yearly_lasttotal}
                        </td>

                        <td role="gridcell" aria-colindex={10} tabindex="0" class="table-cell-fit">
                            <button class="btn btn-ghost-surface btn-sm" on:click={()=>{console.log(row,rowIndex)}}>Console Log</button>
                        </td>

                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-footer">
        <Paginator bind:settings={$dataTableModel.pagination} />
    </div>
</section>