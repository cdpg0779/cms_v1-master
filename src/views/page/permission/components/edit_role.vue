<template>
    <Input v-model="prop_value.role_name">
        <Icon slot="prepend" type="person"></Icon>
        <span slot="prepend">角色</span>
    </Input>
</template>
<script>
    export default {
        props:{
            prop_value:''
        }
    }
</script>