<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref(exportDefaultName)
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = i18n.t('msg.excel.defaultName')
})

const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const res = await getUserManageAllList()
  const allUser = res.list
  const data = formatJson(USER_RELATIONS, allUser)
  const excel = await import('@/utils/Export2Excel')
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  loading.value = true
  closed()
}

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 该方法负责将数组转化成二维数组, `json` 结构转化为 二维数组
// [{ username: '张三', mobile:1234567489...},{},{}]  =>  [[’张三'],[],[]]
const formatJson = (headers, rows) => {
  const arr = []
  rows.forEach((item) => {
    const arrItem = Object.keys(headers).map((key) => {
      // role 角色特使处理
      if (headers[key] === 'role') {
        return JSON.stringify(item[headers[key]].map((obj) => obj.title))
      }
      return item[headers[key]]
    })
    arr.push(arrItem)
  })
  console.log(arr)
  return arr
}
</script>
<style>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
