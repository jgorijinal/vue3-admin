<template>
  <div>
  <div class="excel">
    <export-to-excel v-model="export2ExcelVisible" />
    <el-card>
      <el-row justify="end">
        <el-col>
          <el-button v-permission="['importUser']" type="primary" @click="onImportExcelClick">{{
            $t('msg.excel.importExcel')
          }}</el-button>
          <el-button type="success" @click="onToExcelClick">{{
            $t('msg.excel.exportExcel')
          }}</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div class="user-manage">
    <el-table :data="userManageList" style="width: 100%" border>
      <el-table-column type="index" prop="id" label="#"></el-table-column>
      <el-table-column
        prop="username"
        :label="$t('msg.userInfo.name')"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        :label="$t('msg.excel.mobile')"
        width="180"
      >
        <!-- <template #default="scope">
      </template> -->
      </el-table-column>
      <el-table-column
        prop="avatar"
        :label="$t('msg.excel.avatar')"
        width="140"
        align="center"
      >
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" size="large"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="role" :label="$t('msg.excel.role')" width="180">
        <template #default="scope">
          <el-tag size="small" v-for="item in scope.row.role" :key="item.id">{{
            item.title
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="openTIme"
        :label="$t('msg.excel.openTime')"
        width="140"
      >
        <template #default="scope">
          {{ $filters.dateFilter(scope.row.openTime) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('msg.excel.action')" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="onShowClick(scope.row._id)"
            >{{ $t('msg.excel.show') }}</el-button
          >
          <el-button
            size="small"
            type="info"
            @click="onShowRoleClick(scope.row)"
            v-permission="['distributeRole']"
            >{{ $t('msg.excel.role') }}</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="onRemoveClick(scope.row)"
            v-permission="['removeUser']"
            >{{ $t('msg.excel.remove') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      v-model:currentPage="page"
      v-model:page-size="size"
      :page-sizes="[2, 5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!--??????????????????-->
  <roles-dialog
    v-model="roleDialogVisible"
    :userId="selectUserId"
    @updateRoles="getUserManageListData"
  ></roles-dialog>
</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import router from '@/router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'

const page = ref(1) // ??????
const size = ref(2) // ????????????
const total = ref(0) // ??????
const userManageList = ref([]) // ????????????
const getUserManageListData = async () => {
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  total.value = res.total
  userManageList.value = res.list
}
getUserManageListData()

// ??????????????????
watchSwitchLang(getUserManageListData)

// size ????????????
const handleSizeChange = (pageSize) => {
  size.value = pageSize
  getUserManageListData()
}
// ?????? ????????????
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getUserManageListData()
}
// excel ????????????
const onImportExcelClick = () => {
  router.push('/user/import')
}
// ????????????
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2')
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // ??????????????????
    getUserManageListData()
  })
}
// ????????????
const export2ExcelVisible = ref(false)
const onToExcelClick = () => {
  export2ExcelVisible.value = true
}

// ??????????????????
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

// ?????????????????????
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
// ????????????????????????????????????????????????
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage {
  margin-top: 20px;
}
</style>
