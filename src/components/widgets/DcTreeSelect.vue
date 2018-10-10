<template>
    <div >
        <treeselect v-model="value" :multiple="true" openDirection="below" :options="thisOptions" :always-open="true" :limit="5" :sort-value-by="INDEX"/>
    </div>
</template>
<script>
    import Treeselect from "@riophae/vue-treeselect";
    export default {
        components: { Treeselect },
        model: {
            prop: 'msg',
            event: 'getVue'
        },
        props: ['options','msg'],
        data() {
            return {
                value: [
                ],
                thisOptions: [
                ]
            }
        },
        watch: {
            msg: {
                handler (msg){
                    this.init(msg)
                }
            },
            value: {
                handler (newValue){
                  this.reback(newValue)
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init (msg) {
                let PropOptions=this._props.options
                let options=[]
                for(const index in PropOptions){
                    const propOption =PropOptions[index]
                    let option={}
                    option.id=propOption.key
                    option.label=propOption.value
                    option.isDefaultExpanded=true
                    options.push(option);
                }
                this.thisOptions=options;
                if(msg !=undefined){
                    let data=msg.split(',')
                    let values=[];
                    for(const num in data){
                        values.push(data[num])
                    }
                    this.value=values;
                }

            },
            reback (newValue) {
                let value=''
                for(const index in newValue){
                    if(index==0){
                        value=newValue[index]
                    }
                    else{
                    value=value+','+newValue[index]
                    }
                }
                this.$emit('getVue', value)
            }
        }
    }
</script>