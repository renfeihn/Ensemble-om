<template>
    <v-card>
        <v-card-text>
            <v-layout wrap>
                <v-flex xs12 sm2 m2>
                    <h5 style="margin-top: 2%; color: #64b5f6">定价工厂产品映射:</h5>
                </v-flex>
                <v-flex xs12 sm6 m6 style="margin-top: -2%">
                    <dc-multiselect :isMultiSelect="false" v-model="irlProdType" :options="prodType" labelDesc="产品类型"></dc-multiselect>
                </v-flex>
            </v-layout>
            <v-layout wrap>
                <v-flex xs12 sm2 m2 style="margin-top: 1%">
                    <h5 style="margin-top: 2%; color: #64b5f6">核算产品映射:</h5>
                </v-flex>
                <v-flex xs12 sm6 m6>
                    <dc-multiselect :isMultiSelect="false" v-model="glProdType" :options="prodType" labelDesc="产品类型"></dc-multiselect>
                </v-flex>
            </v-layout>

        </v-card-text>
    </v-card>
</template>
<script>
import DcMultiselect from '@/components/widgets/DcMultiselect'
import {getChargeDefine} from '@/api/table';
import toast from '@/utils/toast';
import { getInitData } from "@/mock/init";
import {getColumnDesc} from '@/utils/columnDesc'
import {removeByValue} from '@/utils/util'
import {getParamTable} from "@/api/url/prodInfo";

export default {
    components: { DcMultiselect},
    props: ["prodData"],
    data () {
        return {
            irlProdType: '',
            glProdType: '',
            prodType: []
        };
    },
    watch: {
        prodData (val) {
            this.initData(val)
        }
    },
    mounted: function() {
        this.initRf();
        this.initData(this._props.prodData)
    },
    methods: {
        //加载备选数据
        initRf() {
            let that = this;
            getParamTable("MB_PROD_TYPE").then(function (response) {
                let prodType = response.data.data.columnInfo;
                for(let i=0; i<prodType.length; i++){
                    if(prodType[i].SOURCE_MODULE == 'RB'){
                        let temp = {}
                        temp["key"] = prodType[i].PROD_TYPE;
                        temp["value"] = prodType[i].PROD_DESC;
                        that.prodType.push(temp)
                    }
                }
            });
        },
        //获取原始数据
        initData(val) {
            console.log(val);
            if(val.glProdMappings != undefined && val.glProdMappings.length) {
                this.glProdType = val.glProdMappings[0].mappingType;
            }
            if(val.irlProdTypes != undefined && val.irlProdTypes != null && val.irlProdTypes.length) {
                this.irlProdType = val.irlProdTypes[0].prodType;
            }
        }
    }
};
</script>

<style scoped>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 30px;
    }
</style>