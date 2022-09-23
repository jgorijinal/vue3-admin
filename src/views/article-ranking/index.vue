<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        ref="tableRef"
      >
        <el-table-column
          v-for="(item, index) in tableColumns"
          :prop="item.prop"
          :label="item.label"
          :key="index"
        >
          <template v-if="item.prop === 'publicDate'" #default="scope">
            {{ $filters.relativeTime(scope.row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.article.action')" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="onShowClick(scope.row)"
              >{{ $t('msg.article.show') }}</el-button
            >
            <el-button
              size="small"
              type="info"
              @click="onRemoveClick(scope.row)"
              >{{ $t('msg.article.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:currentPage="page"
        v-model:page-size="size"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
// 数据相关
const tableData = ref([]) // 文章列表
const page = ref(1) // 当前页码
const size = ref(10) // 每页条数
const total = ref(0) // 总数
const loading = ref(false) // loading 动画

// 获取文章列表
const getListData = async () => {
  loading.value = true
  const res = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total
  loading.value = false
  console.log(res)
}

getListData()
// 接口国际化处理
watchSwitchLang(getListData)

const router = useRouter()
// 查看按钮
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
// 删除按钮
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2')
  )
    .then(async() => {
      await deleteArticle(row._id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      // 重新获取数据
      getListData()
    })
    .catch(() => {})
}
// 每页条数改变
const handleSizeChange = (pageSize) => {
  size.value = pageSize
  getListData()
}
// 页码改变
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// 表格拖拽相关
onMounted(() => {
  initSortable(tableData, getListData)
  console.log(tableRef.value.$el)
})
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  ::v-deep .sortable-ghost {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }
}
</style>
