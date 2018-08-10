// https://eslint.org/docs/user-guide/configuring
// eslint-disable-next-line 
/* eslint-disable */
module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2017,
      sourceType: 'module'
    },    
    extends: [
        'eslint-config-alloy/vue',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // Vue: false
    },
    rules: {
        // 这里填入你的项目需要的个性化配置，比如：
        //
        // // @fixable 一个缩进必须用两个空格替代
        'indent': [0, 4, {
            "SwitchCase": 1
        }
        ],
        'no-undef-init': 1,
        'no-trailing-spaces': 0,
        'no-undefined': 0,
        'no-void': 0,
        "comma-spacing": [0, {
            "before": false,
            "after": true
        }],
        "object-curly-spacing": 0,
        'no-unused-vars': 0,
        "space-infix-ops": 0,
        "keyword-spacing": 0,
        "space-before-function-paren": [0, "always"],
        // 强制在块之前使用一致的空格
        "space-before-blocks": [0, "always"],
        "eqeqeq": [0, "allow-null"],
        "semi": [0, "always"],
        "spaced-comment": [0, "always", {
            "markers": ["global", "globals", "eslint", "eslint-disable", "*package", "!"]
        }],
        "quotes": 0,
        "guard-for-in": 0,
        "no-duplicate-imports": 0,
        "radix": 0,
        "no-use-before-define": 0,
        'no-param-reassign': 0,
        "vetur.validation.template" : 0,
        // 禁止出现未使用过的表达式
        "no-unused-expressions": 0,
        'import/no-unresolved': 0,
        "no-implicit-coercion": 0,
        "require-v-for-key": 0,
        "no-return-assign": 0,
        'vue/html-quotes':0,
        'vue/valid-v-for':0,
        'vue/require-v-for-key':0,
        'prefer-promise-reject-errors':0,
        "no-var": 0,
        "yoda": [0, "never"],
    },
    
};
