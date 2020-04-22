<template>
    <div class="wrapper col-12 col-md-6">
      <h3>{{ title }}</h3>
      <ul>
        <li v-bind:class="{ mandatory: !(prompt.optional == undefined || prompt.optional)}" v-for="(prompt, index) in activePrompts">
          {{ prompt.name }}
          <span class="float-right">
        <button class="btn btn-sm" v-on:click="moveUp(index)"><span class="fa fa-caret-up"></span></button>
        <button class="btn btn-sm" v-on:click="moveDown(index)"><span class="fa fa-caret-down"></span></button>
        <button class="btn btn-sm" v-on:click="showSettings(index)"><span class="fa fa-cog"></span></button>
        <button class="btn btn-sm" v-if="prompt.optional" v-on:click="remove(index)"><span
            class="fa fa-trash"></span></button>
        </span>
        </li>
      </ul>

      <button class="btn" data-toggle="modal" v-bind:data-target="'#'+modalId"><span class="fa fa-plus"></span> Add prompt
      </button>

      <div class="modal fade" v-bind:id="modalId" tabindex="-1" role="dialog" v-bind:aria-labelledby="modalId + 'Label'"
           aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" v-bind:id="modalId+'Label'">Select prompt type</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 v-if="getAvailableStandardPrompts().length > 0">Standard prompts</h5>
              <ul>
                <li v-bind:class=" { selected : selectedStandardPromptType != null && item.type == selectedStandardPromptType.type } "
                    v-for="item in getAvailableStandardPrompts()"
                    v-on:click="selectStandardPromptType(item)"> {{ item.name }}
                </li>
              </ul>
              <h5>Custom prompts</h5>
              <ul>
                <li v-bind:class=" { selected: selectedCustomPromptType != null && item.type == selectedCustomPromptType.type } "
                    v-for="item in customPromptTypes"
                    v-on:click="selectCustomPromptType(item)">{{ item.name }}
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

      <div class="modal fade" v-bind:id="modalId+'Settings'" tabindex="-1" role="dialog" v-bind:aria-labelledby="modalId+'SettingsLabel'"
           aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" v-bind:id="modalId+'SettingsLabel'">Prompt settings</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body" v-if=" this.settingsFor != null && this.settingsFor.kind == 'StandardPrompt'">

              <form>
                <div class="form-group">
                  <label>Prompt name</label>
                  <input type="text" class="form-control" v-model="settingsFor.name"/>
                </div>
                <div class="form-group">
                  <label>Language</label>
                  <select class="form-control">
                    <option>English (UK)</option>
                    <option>Arabic (UAE)</option>
                    <option>Portuguese (Portugal)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Question text</label>
                  <textarea class="form-control">Question text placeholder blah blah blah</textarea>
                </div>
              </form>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
              </div>
            </div>


            <div class="modal-body" v-if=" this.settingsFor != null && this.settingsFor.kind == 'CustomPrompt' && (this.settingsFor.type == 'SingleChoice' || this.settingsFor.type == 'MultipleChoice')">

              <form>
                <div class="form-group">
                  <label>Prompt name</label>
                  <input type="text" class="form-control" v-model="settingsFor.name"/>
                </div>
                <div class="form-group">
                  <label>Data field ID</label>
                  <input type="text" class="form-control" placeholder="fieldId"/>
                </div>
                <div class="form-group">
                  <label>Language</label>
                  <select class="form-control">
                    <option>English (UK)</option>
                    <option>Arabic (UAE)</option>
                    <option>Portuguese (Portugal)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Question text</label>
                  <textarea class="form-control">Question text placeholder blah blah blah</textarea>
                </div>
                <div class="form-group">
                  <label>Options:</label>
                  <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                    <li>Option 5</li>
                    <li>Option 6</li>
                  </ul>
                </div>
              </form>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
              </div>
            </div>

            <div class="modal-body" v-if=" this.settingsFor != null && this.settingsFor.kind == 'CustomPrompt' && this.settingsFor.type == 'FreeText'">

              <form>
                <div class="form-group">
                  <label>Prompt name</label>
                  <input type="text" class="form-control" v-model="settingsFor.name"/>
                </div>
                <div class="form-group">
                  <label>Data field ID</label>
                  <input type="text" class="form-control" placeholder="fieldId"/>
                </div>
                <div class="form-group">
                  <label>Language</label>
                  <select class="form-control">
                    <option>English (UK)</option>
                    <option>Arabic (UAE)</option>
                    <option>Portuguese (Portugal)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Question text</label>
                  <textarea class="form-control">Question text placeholder blah blah blah</textarea>
                </div>
              </form>

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
    import {Component, Prop, Vue} from "vue-property-decorator";
    import $ from "jquery";
    import {CustomPrompt, StandardPrompt} from "@/prompt-types";

    @Component
    export default class OrderedList extends Vue {
        private selectedStandardPromptType: StandardPrompt | null = null;
        private selectedCustomPromptType: CustomPrompt | null = null;

        private settingsFor: StandardPrompt | CustomPrompt | null = null;


        @Prop() private modalId!: string;

        @Prop() private title!: string;

        @Prop() private standardPromptTypes!: StandardPrompt[];

        private customPromptTypes: Array<CustomPrompt> = [
            {
                kind: "CustomPrompt",
                type: "SingleChoice",
                name: "Single-choice question"
            },
            {
                kind: "CustomPrompt",
                type: "MultipleChoice",
                name: "Multiple-choice question"
            },
            {
                kind: "CustomPrompt",
                type: "FreeText",
                name: "Free text question"
            }
        ];

        private activePrompts: Array<StandardPrompt | CustomPrompt> = [];

        constructor() {
            super();

            this.standardPromptTypes.forEach(p => {
                if (!p.optional)
                    this.activePrompts.push({...p});
            })

        }

        remove(index: number) {
            this.activePrompts.splice(index, 1)
        }

        moveUp(index: number) {
            if (index > 0) {
                let t = this.activePrompts[index];
                this.activePrompts[index] = this.activePrompts[index - 1];
                this.activePrompts[index - 1] = t;
                this.$forceUpdate();
            }

        }

        moveDown(index: number) {
            if (index < this.activePrompts.length - 1) {
                let t = this.activePrompts[index];
                this.activePrompts[index] = this.activePrompts[index + 1];
                this.activePrompts[index + 1] = t;
                this.$forceUpdate();
            }
        }

        showSettings(index: number) {
            this.settingsFor = this.activePrompts[index];
            (<any>$("#"+this.modalId+"Settings")).modal("show");
        }

        addSelectedPromptType() {

            if (this.selectedStandardPromptType != null) {
                this.activePrompts.push({...this.selectedStandardPromptType});
            } else if (this.selectedCustomPromptType != null) {
                this.activePrompts.push({...this.selectedCustomPromptType});
            }

            (<any>$("#"+this.modalId)).modal("hide");
        }

        selectStandardPromptType(prompt: StandardPrompt) {
            this.selectedStandardPromptType = prompt;
            this.selectedCustomPromptType = null;
        }

        selectCustomPromptType(prompt: CustomPrompt) {
            this.selectedStandardPromptType = null;
            this.selectedCustomPromptType = prompt;
        }

        getAvailableStandardPrompts(): Array<StandardPrompt> {
            let result = Array<StandardPrompt>();

            this.standardPromptTypes.forEach(prompt => {
                    if (!this.activePrompts.some(p => p.type == prompt.type))
                        result.push({...prompt});
                }
            );

            return result;
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
    background-color: rgb(234, 234, 234);
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 5px;
    cursor: pointer;
  }

  li.selected {
    border: 2px solid #646464;
    font-weight: 600;
  }

  li.mandatory {
    font-weight: 600;
    background-color: lightblue;

  }

  h3 {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid black;
    margin-bottom: 1rem;
  }

  .wrapper {
    margin-bottom: 2rem;
  }

</style>
