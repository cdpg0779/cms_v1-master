<template>
    <Input v-model="prop_value.name">
        <Icon slot="prepend" type="person"></Icon>
        <span slot="prepend">用户</span>
    </Input>
</template>
<script>
    export default {
        props:{
            prop_value:''
        }
    }
</script>