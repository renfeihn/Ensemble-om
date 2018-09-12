export default {
    getProdInfo: (val) => ({
        prodType: {
            prodDesc: '活期存款',
            prodClass: 'RB100',
            prodRange: 'S',
            prodGroup: 'Y',
            status: 'A',
        },
        prodDefines: {
            ACCT_STRUCT_FLAG: {
                attrValue: '1'
            },
            ACCT_TYPE: {
                attrValue: 'C'
            },
            ACCT_REAL_FLAG: {
                attrValue: '10'
            },
            ACCT_INT_FLAG: {
                attrValue: '10'
            },
            ACCT_BAL_FLAG: {
                attrValue: '10'
            },
            PROFIT_CENTRE: {
                attrValue: '99'
            },
            PROD_START_DATE: {
                attrValue: '20180101'
            },
            PROD_END_DATE: {
                attrValue: '20190101'
            }
        },
        mbEventInfos: {
             CLOSE_RB101: {
                 mbEventAttrs: {
                     CHECK_AGENT: {
                         attrValue: 'Y'
                     }
                 }
             }
         },
        productObject: {
            clientType: '10',
            inlandOffshore: 'I',
            clientSubType: '101',
            clientLevel: 'N',
            ageBetween: 'between',
            occupation: '0',
            channelChoose: 'MT',
            applyBranch: '0',
            branchChoice: '9999',
            applyArea: '1',
            areaChoose: '1'
        },
        intDetail: {
            cycleFreq: '2M',
            cycleSelfFlag: 'Y'
        },
        openAcct: {
            structureType: 'CD2',
            checkWdrawnType: 'Y',
            restraintFlag: 'Y',
            withdrawTypeHandeling: 'Y',
            daiBanFlag: 'Y',
            clientAmtCheckFlag: 'Y',
            startDepositAmt: 'Y'
        },
        closeAcct: {
            systemControlApproach: 'N',
            permitCommersionFlag: 'N',
            cashResouce: 'C',
            acctReatraintCheck: 'N',
            resignCheck: 'Y',
            ownCheck: 'N',
            huiTuiFlag: 'N',
        },
        deposit: {
          depositControlApproach: 'Y',
          permitCommersionFlag: 'N',
          cashResource: 'C',
          acctReatraintCheck: 'N',
          weiYueType: 'S',
          dealingWay: 'D',
          startAmtCheck: 'N',
          danciDepositCheck: 'N'
        },
        drawInfo: {
            drawControlWay: 'Y',
            daiBanFlag: 'N',
            cashResource: 'C',
            attrReatraintCheck: 'N',
            withDrawlCheck: 'N',
            voucherTypeCheck: 'N',
            weiYueType: 'D',
            dealingWay: 'D',
            danciYueCheck: 'Y',
            acctBalanceCheck: 'N'
        },
        acctBaseInfo: {
            prodcode: '111001',
            proddesc: '个人活期产品',
            sourceModule: 'RB',
            prodClass: 'RB',
            prodAttr: 'S',
            isGroup: 'Y',
            prodStatus: 'A',
            baseprodtype: 'RBA01',
            acctType: 'A',
            subAcctType: 'A',
            isMultiCcy: 'N',
            ccy: 'CNY',
            acctIntFlag: '00',
            profitCentre: '99',
            effectdate: '2018-09-09',
            failuredate: '2022-02-02',
            isMutiVoucher: 'N',
            voucherType: '001',
            acctSubType: 'D',
            acctNature: '1',
            ownershipType: 'SG',
            acctClass: 'I',
            balType: 'CA',
            withdrawalType: 'B',
            discountCcy: 'USD',
            defaultCcy: 'CNY',
        },
    controlInfo: {
        draRange: '0',
        depRange: '0',
        tDepFlag: '0',
        cashDepFlag: '0',
        clientFlag: 'Y',
        channelFlag: 'Y',
        branchControlFlag: 'Y',
        chargeFlag: 'Y',
        moveFlag: 'Y',
    }
  })
}