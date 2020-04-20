<template>
  <div id="app">
    <ordered-list></ordered-list>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import OrderedList from "@/components/OrderedList.vue";

    @Component({
        components: {
            OrderedList

        },
    })
    export default class App extends Vue {
    }
</script>

