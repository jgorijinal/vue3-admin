<template>
  <div class="excel">
    <el-card>
      <el-row justify="end">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="onImportExcelClick">{{ $t('msg.excel.importExcel') }}</el-button>
          <el-button type="success" size="small">{{ $t('msg.excel.exportExcel') }}</el-button>
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
          <el-button size="small" type="primary">查看</el-button>
          <el-button size="small" type="info">角色</el-button>
          <el-button size="small" type="danger" @click="delete scope.row.id"
            >删除</el-button
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
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import router from '@/router'
const page = ref(1) // 页码
const size = ref(2) // 每页条数
const total = ref(0) // 总数
const userManageList = ref([]) // 员工列表
const getUserManageListData = async () => {
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  console.log(res)
  total.value = res.total
  userManageList.value = res.list
}
getUserManageListData()

// 监听语言变化
watchSwitchLang(getUserManageListData)

// size 改变触发
const handleSizeChange = (pageSize) => {
  size.value = pageSize
  getUserManageListData()
}
// 页码 改变触发
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getUserManageListData()
}
// excel 页面跳转
const onImportExcelClick = () => {
  router.push('/user/import')
}
</script>

<style lang="scss" scoped>
.user-manage {
  margin-top: 20px;
}
</style>
