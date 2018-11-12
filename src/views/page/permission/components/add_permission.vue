<template>
    <Input v-model="prop_value.permission_name">
        <Icon slot="prepend" type="person"></Icon>
        <span slot="prepend">权限名称</span>
    </Input>
</template>
<script>
    export default {
        props:{
            prop_value:''
        }
    }
</script>