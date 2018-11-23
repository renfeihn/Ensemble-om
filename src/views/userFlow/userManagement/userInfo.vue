<template>
    <form style="width: 100%">
        <v-text-field
                v-validate="'required|max:10'"
                v-model="name"
                :counter="10"
                :error-messages="errors.collect('name')"
                label="Name"
                data-vv-name="name"
                required
        ></v-text-field>
        <v-text-field
                v-validate="'required|email'"
                v-model="email"
                :error-messages="errors.collect('email')"
                label="E-mail"
                data-vv-name="email"
                required
        ></v-text-field>
        <v-select
                v-validate="'required'"
                :items="items"
                v-model="select"
                :error-messages="errors.collect('select')"
                label="Select"
                data-vv-name="select"
                required
        ></v-select>
        <v-checkbox
                v-validate="'required'"
                v-model="checkbox"
                :error-messages="errors.collect('checkbox')"
                value="1"
                label="Option"
                data-vv-name="checkbox"
                type="checkbox"
                required
        ></v-checkbox>

        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </form>
</template>
<script>
    import axios from 'axios'

    export default {
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            checkbox: false
        }),

        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    axios.post('/api/submit', {
                        name: this.name,
                        email: this.email,
                        select: this.select,
                        checkbox: this.checkbox
                    })
                }
            },
            clear () {
                this.$refs.form.reset()
            }
        }
    }
</script>