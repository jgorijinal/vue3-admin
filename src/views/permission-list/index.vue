<template>
  <div class="">
    <el-card>
      <el-table
        border
        style="width: 100%; margin-bottom: 20px"
        :data="allPermission"
        default-expand-all
        row-key="id"
        :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
      >
        <el-table-column
          :label="$t('msg.permission.name')"
          prop="permissionName"
          width="200"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.mark')"
          prop="permissionMark"
          width="200"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.desc')"
          prop="permissionDesc"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const allPermission = ref([])
const getPermissionList = async () => {
  const res = await permissionList()
  allPermission.value = res
}
getPermissionList()

// 接口国际化处理
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
