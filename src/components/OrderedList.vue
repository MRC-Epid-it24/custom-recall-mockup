<template>
  <div>
    <ul>
      <li v-for="(item, index) in foodPrompts">
        {{ item }}
        <span class="float-right">
        <button class="btn btn-sm" v-on:click="moveUp(index)"><span class="fa fa-caret-up"></span></button>
        <button class="btn btn-sm" v-on:click="moveDown(index)"><span class="fa fa-caret-down"></span></button>
        <button class="btn btn-sm" v-on:click="showSettings(index)"><span class="fa fa-cog"></span></button>
        <button class="btn btn-sm" v-on:click="remove(index)"><span class="fa fa-trash"></span></button>
        </span>
      </li>
    </ul>

    <button class="btn" data-toggle="modal" data-target="#promptTypeModal"><span class="fa fa-plus"></span> Add prompt
    </button>

    <div class="modal fade" id="promptTypeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">Select prompt type</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Standard prompts</h5>
            <ul>
              <li v-bind:class=" { selected : index == selectedStandardPromptType } "
                  v-for="(item, index) in standardPromptTypes"
                  v-on:click="selectStandardPromptType(index)"> {{ item }}
              </li>
            </ul>
            <h5>Custom prompts</h5>
            <ul>
              <li v-bind:class=" { selected: index == selectedCustomPromptType } "
                  v-for="(item, index) in customPromptTypes"
                  v-on:click="selectCustomPromptType(index)">{{ item }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-bind:disabled="selectedStandardPromptType == null && selectedCustomPromptType == null"
                    v-on:click="addSelectedPromptType()"
                    type="button"
                    class="btn btn-primary">Add selected prompt
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="promptSettingsModal" tabindex="-1" role="dialog" aria-labelledby="promptSettingsLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="promptSettingsLabel">Prompt settings</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Question text:</h5>
            <p>Example prompt question</p>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import $ from "jquery";

    @Component
    export default class OrderedList extends Vue {
        private selectedStandardPromptType: number | null = null;
        private selectedCustomPromptType: number | null = null;

        private standardPromptTypes: Array<string> = ["Portion size estimation", "Food lookup", "Associated foods"];
        private customPromptTypes: Array<string> = ["Single-choice question", "Multiple-choice question", "Free text question"];

        private foodPrompts: Array<string> = ["Portion size estimation", "Food lookup", "Associated foods"];

        remove(index: number) {
            this.foodPrompts.splice(index, 1)
        }

        moveUp(index: number) {
            if (index > 0) {
                let t = this.foodPrompts[index];
                this.foodPrompts[index] = this.foodPrompts[index - 1];
                this.foodPrompts[index - 1] = t;
                this.$forceUpdate();
            }

        }

        moveDown(index: number) {
            if (index < this.foodPrompts.length - 1) {
                let t = this.foodPrompts[index];
                this.foodPrompts[index] = this.foodPrompts[index + 1];
                this.foodPrompts[index + 1] = t;
                this.$forceUpdate();
            }
        }

        showSettings(index: number) {
            $("#promptSettingsModal").modal("show");
        }

        addSelectedPromptType() {

            if (this.selectedStandardPromptType != null) {
                this.foodPrompts.push(this.standardPromptTypes[this.selectedStandardPromptType]);
            } else if (this.selectedCustomPromptType != null) {
                this.foodPrompts.push(this.customPromptTypes[this.selectedCustomPromptType]);
            }

            $("#promptTypeModal").modal("hide");
        }

        selectStandardPromptType(index: number) {
            this.selectedStandardPromptType = index;
            this.selectedCustomPromptType = null;
        }

        selectCustomPromptType(index: number) {
            this.selectedStandardPromptType = null;
            this.selectedCustomPromptType = index;
        }
    }
</script>

<style scoped>

  .floating {
    width: 200px;
    border: gray 1px solid;
    border-radius: 5px;
    position: absolute;
    background: white;
    z-index: 1000;
  }

  ul {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 0;
  }

  li {
    position: relative;
    display: block;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
    cursor: pointer;
  }

  li.selected {
    background-color: #eaeaea;
    border-radius: 5px;
    border: 2px solid #646464;
    font-weight: bold;
  }

</style>
