<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          type="index"
          :label="$t('msg.article.ranking')"
          width="120"
        />
        <el-table-column
          prop="title"
          :label="$t('msg.article.title')"
          width="180"
        />
        <el-table-column
          prop="author"
          :label="$t('msg.article.author')"
          width="180"
        />
        <el-table-column
          prop="publicDate"
          :label="$t('msg.article.publicDate')"
        >
          <template #default="scope">
            {{ $filters.relativeTime(scope.row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('msg.article.desc')" />
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
import { ref } from 'vue'
import { getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
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
}

getListData()
// 接口国际化处理
watchSwitchLang(getListData)

// 查看按钮
const onShowClick = (row) => {
  // console.log(row._id)
}
// 删除按钮
const onRemoveClick = (row) => {
  // console.log(row._id)
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
}
</style>
