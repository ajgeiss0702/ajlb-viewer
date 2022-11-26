<script>

    import {ProgressRadial} from "@brainandbones/skeleton";
    import {onDestroy, onMount} from "svelte";

    let value;

    let nextStep;

    onMount(() => {
        nextStep = setTimeout(() => {
            makeNext();
        }, random(5, 500))
    });

    function makeNext() {
        nextStep = setTimeout(() => {
            if(typeof value === "undefined") value = 0;
            value += Math.round(random(value > 90 ? 0 : 1, value > 80 ? 1 : 10));
            if(value >= 100) {
                value = undefined;
                return;
            }
            makeNext();
        }, random(value > 80 ? 100 : 50, 500))
    }

    function random(min, max) {
        return min + (Math.random() * (max - min));
    }

    onDestroy(() => {
        clearTimeout(nextStep);
    })
</script>

<ProgressRadial {value}/>