<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.role.assignPermissions')"
    @close="closed"
  >
    <!--内容-->
    <el-tree
      :props="{
        label: 'permissionName',
        children: 'children'
      }"
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
    />
    <!--footer 插槽-->
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="onConfirm">{{
        $t('msg.universal.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission, distributePermission } from '@/api/role'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 首先获取所有权限
const allPermission = ref([]) // 所有权限列表
const getPermissionList = async () => {
  const res = await permissionList()
  allPermission.value = res
}
getPermissionList()
// 接口国际化处理
watchSwitchLang(getPermissionList)

// 获取当前用户的权限
const treeRef = ref(null)
const getRolePermission = async (roleId) => {
  const checkedKeys = await rolePermission(roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(() => props.roleId, (value) => {
  if (value) {
    getRolePermission(value)
  }
})
const i18n = useI18n()
const onConfirm = async () => {
  // 确定 逻辑
  // 拿到 tree 上选中的 keys, 调接口
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
// 关闭
const closed = () => {
  emits('update:modelValue', false)
}
</script>
<style lang="scss" scoped></style>
