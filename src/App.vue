<template>
  <div id="app">
    <div class="row">
      <ordered-list title="Food prompts" v-bind:standard-prompt-types="standardFoodPrompts" modal-id="foodPromptsModal"></ordered-list>
      <ordered-list title="Meal prompts" v-bind:standard-prompt-types="standardMealPrompts" modal-id="mealPromptsModal"></ordered-list>
      <ordered-list title="Recall prompts" v-bind:standard-prompt-types="standardRecallPrompts" modal-id="recallPromptsModal"></ordered-list>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import OrderedList from "@/components/OrderedList.vue";
    import {StandardPrompt} from "@/prompt-types";


    @Component({
        components: {
            OrderedList
        },
    })
    export default class App extends Vue {
        standardFoodPrompts: Array<StandardPrompt> = [
            {
                kind: "StandardPrompt",
                type: "FoodLookup",
                name: "Select food from database",
                optional: false
            },
            {
                kind: "StandardPrompt",
                type: "PortionSizeEstimationMethod",
                name: "Select portion size estimation method",
                optional: false
            },
            {
                kind: "StandardPrompt",
                type: "PortionSizeEstimation",
                name: "Estimate portion size",
                optional: false
            },
            {
                kind: "StandardPrompt",
                type: "SameAsBefore",
                name: "Ask if same as before",
                optional: true

            },
            {
                kind: "StandardPrompt",
                type: "ReadyMeal",
                name: "Ask if food was from a ready meal",
                optional: true
            },
            {
                kind: "StandardPrompt",
                type: "BrandName",
                name: "Ask for brand name",
                optional: true
            }
        ];

        standardMealPrompts: Array<StandardPrompt> = [
            {
                kind: "StandardPrompt",
                type: "MealTime",
                name: "Confirm meal time",
                optional: false
            },
            {
                kind: "StandardPrompt",
                type: "FreeTextFoods",
                name: "Free text food entry",
                optional: false
            },
            {
                kind: "StandardPrompt",
                type: "DrinksReminder",
                name: "Suggest drinks if none entered",
                optional: true
            },
            {
                kind: "StandardPrompt",
                type: "AssociatedFoodsManual",
                name: "Suggest associated foods (manual)",
                optional: true
            },
            {
                kind: "StandardPrompt",
                type: "AssociatedFoodsAutomated",
                name: "Suggest associated foods (automated)",
                optional: true
            }
        ];

        standardRecallPrompts: Array<StandardPrompt> = [
            {
                kind: "StandardPrompt",
                type: "FinalPage",
                name: "Confirm and submit",
                optional: false
            },
            {
                kind: "StandardPrompt",
                type: "FinalReminder",
                name: "Final foods reminder",
                optional: true
            },
            {
                kind: "StandardPrompt",
                type: "EnergyCheck",
                name: "Low calorie intake check",
                optional: true
            },
            {
                kind: "StandardPrompt",
                type: "TimeGap",
                name: "Time gap check",
                optional: true
            }

        ]

    }
</script>

