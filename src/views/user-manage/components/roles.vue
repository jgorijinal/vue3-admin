<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    @close="closed"
    destroy-on-close
  >
    <!--内容 多选框显示 -->
    <el-checkbox-group v-model="userRoleTitleList" v-loading="loading">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      >
      </el-checkbox>
    </el-checkbox-group>
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
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
// 获取所有角色
const allRoleList = ref([]) // 所有角色列表
// 获取所有角色方法
const getListData = async () => {
  const res = await roleList()
  allRoleList.value = res
}
getListData()
// 接口国际化处理
watchSwitchLang(getListData)

const loading = ref(false)

// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async (userId) => {
  loading.value = true
  const res = await userRoles(userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
  loading.value = false
}
watch(
  () => props.userId,
  (value) => {
    if (value) {
      getUserRoles(value)
    }
  }
)

const i18n = useI18n()
const emits = defineEmits(['update:modelValue', 'updateRoles'])
// 确定按钮
const onConfirm = async () => {
  // 确定按钮逻辑
  // 处理数据的结构
  console.log(userRoleTitleList.value)
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((item) => (item.title === title))
  })
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess')) // 提示成功
  // 角色更新成功
  emits('updateRoles')
  closed()
}
// 关闭
const closed = () => {
  emits('update:modelValue', false)
}
</script>
<style lang="scss" scoped></style>
