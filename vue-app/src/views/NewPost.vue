<template>
  <v-container class="my-16">
      <v-row dense>
          <v-col cols="12">
                  <v-form
       ref="form"
       v-model="valid"
       lazy-validation
       @submit.prevent="submit"
       >
              <v-card outlined>
                  <v-card-title  class="blue white--text">Create/Edit Post</v-card-title>

                <v-card-text>
                 <v-row>
                            <v-col cols="12">
                       <v-select
						:items="$store.state.categories.map(category => category.name)"
						v-model="form.category"
						label="Select category"
            :rules="[v => !!v || 'Post category is required']"
						required
                        outlined
						></v-select>
                   </v-col>
                      <v-col cols="12">
                         <v-text-field
                         placeholder="Enter title"
                         v-model="form.title"
                          :rules="[v => !!v || 'Enter a title']"
                         label="Post Title"
                         outlined
                         required
                         >
                         </v-text-field>
                      </v-col>
                         <v-col cols="12">
                               <vue-editor :editorToolbar="customToolbar"  v-model="form.post"></vue-editor>
                        </v-col>
                        <v-col cols="12">
                          <v-switch
                        v-model="preview"
                        label="preview"
                      ></v-switch>
                              <div v-show="preview" v-html="form.post"></div>
                        </v-col>
                        <v-col cols="12">
                          <template>
                      <v-file-input
                        label="Upload Front image"
                        outlined
                        v-model="form.image"
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </template>
                        </v-col>
                             <v-col
                            cols="12"
                             v-if="form.image">
                             <v-avatar
                             tile
                              class="profile"
                            color="grey"
                            size="164"
                             :loading="!form.image"
                             >
                             <v-img :src='previewFile()'></v-img>
                             </v-avatar>
                           </v-col>
                                <v-col
                            cols="12"
                            sm="6"
                            md="4" v-if="this.mode == 'edit' && !form.image">
                            <v-avatar
                             tile
                            class="profile"
                            color="grey"
                            size="164"
                            :loading="!temp_img"
                             >
                               <v-img :src='temp_img'></v-img>
                           </v-avatar>
                           </v-col>
                        <v-col cols="12">
                      <v-combobox multiple
                    v-model="form.tags" 
                    label="Tags" 
                    append-icon
                    chips
                    outlined
                    deletable-chips
                    class="tag-input"
                    :search-input.sync="tag" 
                    @keyup.tab="updateTags"
                    @paste="updateTags">
                    <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              close
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              {{ data.item }}
            </v-chip>
          </template>
              </v-combobox>
                        </v-col>
                 </v-row>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
          <v-btn
            color="success"
            type="submit"
            large
            :disabled="!valid"
          >
          {{mode == 'add' ? 'Publish Blog' : 'Save Changes'}}  
          </v-btn>
            <v-btn
            color="primary"
            outlined
             @click="draft()"
            :disabled="!valid"
            large
          >
            Add to draft
          </v-btn>
           </v-card-actions>
              </v-card>
                  </v-form>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */ 

import { mapGetters } from 'vuex';
import Post from '../apis/Post';
import { VueEditor } from "vue2-editor";

export default {
data:() =>({
    dialog:true,
    valid: true,
    preview:true,
    customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],

      ["bold", "italic", "underline","strike",],
               [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
    ],
      ["blockquote", "code-block"],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ color: [] }],
       [{ list: "ordered" }, { list: "bullet" }],
        ["code-block","link",],
          ["clean"] // remove formatting button

      ],
    tag:'',
    items:[
        "Laravel",
        "Node.js",
        "c#",
        "Other"
    ],
    form:{
        category:'',
        title:'',
        post:'',
        tags:[],
        image:null,
        isDraft:false
    },
        temp_img:''

}),

computed:{
...mapGetters(['postDialog'])
},
methods:{
      previewFile(){
      return  URL.createObjectURL(this.form.image)
     },
  checkMode(){
    if(this.mode == 'edit'){
     //set form
     this.form = {
       category: this.post.category.name,
       title:this.post.title,
       post:this.post.post,
       tags:this.post.tags[0].name.split(","),
       isDraft:this.post.isDraft ? true : false,
     }
    this.temp_img =`${process.env.VUE_APP_BASE_URL}/storage/${this.post.image.path}`
    }
  },
   draft(){
     this.form.isDraft = true;
     this.submit();
   },
    submit(){
         this.$refs.form.validate();
         let formData = new FormData();
             for(const [key, value] of Object.entries(this.form)){
                  formData.append(key,this.checkKey(key,value));
            }
         if(this.valid){
            //post form
            Post.create(
              formData, //form data to submit
              this.mode, //edit or asdd
               this.post != null ? this.post.id : null //id ofpost if edit
               )
            .then((res) =>{
             this.$refs.form.reset()
            });
         }
    },
      checkKey(key,value){
              return key === "attributes" ?  JSON.stringify(value) : value;
            },
    updateTags() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.tag = "";
        });
      });
      // console.log(this.form.tags)
    }
},
created(){
this.checkMode();
},
components:{
  VueEditor
},
props:{
  mode:{
    type:String
  },
  post:{
    type:Object
  }
}


}

</script>
