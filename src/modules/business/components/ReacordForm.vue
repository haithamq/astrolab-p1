<template>
    <v-card>
        <v-card-title>
            <span class="headline">Reacord</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="id" label="ID" required></v-text-field>
                <v-text-field v-model="notes" label="Notes"></v-text-field>
                <v-text-field v-model="amount" label="amount"></v-text-field>
                <v-text-field v-model="currency" label="currency"></v-text-field>
                <v-checkbox v-model="checkbox" :rules="[v >= !!v || 'You must agree to continue!']"
                            label="Do you agree?" required></v-checkbox>

                <v-btn :disabled="!valid" @click="submit">
                    submit
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    // import axios from 'axios'

    export default {
        data: () => ({
            valid: true,

            id: '',
            notes: '',
            amount: '',
            currency: '',
            checkbox: false,
        }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    // axios.post('/api/submit', {
                    //   name: this.name,
                    //   email: this.email,
                    //   select: this.select,
                    //   checkbox: this.checkbox
                    // })
                }
            },
            clear() {
                this.$refs.form.reset();
            },
        },
    };
</script>