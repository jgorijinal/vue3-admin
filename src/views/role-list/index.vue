<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
      <el-table-column
        type="index"
        :label="$t('msg.role.index')"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="title"
        :label="$t('msg.role.name')"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="describe"
        :label="$t('msg.role.desc')"
        width="300"
      ></el-table-column>
      <el-table-column :label="$t('msg.role.action')">
        <el-button type="primary" size="small">
          {{ $t('msg.role.assignPermissions') }}</el-button
        >
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
const allRoles = ref([]) // 角色列表
const getRoleList = async () => {
  const res = await roleList()
  allRoles.value = res
}
getRoleList()

// 接口国际化处理
watchSwitchLang(getRoleList)
</script>

<style lang="scss" scoped></style>
