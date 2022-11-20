<template>

  <div>
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
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="onDistributePermissionClick(scope.row)"
              v-permission="['distributePermission']"
            >
              {{ $t('msg.role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  <distribute-permission
    v-model="distributePermissionVisible"
    :roleId="selectRoleId"
  ></distribute-permission>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'
const allRoles = ref([]) // 角色列表
const getRoleList = async () => {
  const res = await roleList()
  allRoles.value = res
}
getRoleList()

// 接口国际化处理
watchSwitchLang(getRoleList)

// 分配权限 弹出层
const distributePermissionVisible = ref(false)

const selectRoleId = ref('')

const onDistributePermissionClick = (row) => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}
</script>

<style lang="scss" scoped></style>
