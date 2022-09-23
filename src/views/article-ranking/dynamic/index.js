/**
 * 1. 动态的列数据 : 被 v-for 循环的列数据
 * 2. 被勾选的动态列数据
 * 3. table 的列数据
 */
import { ref, watch } from 'vue'
import DynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'

// 暴露出动态的列数据
export const dynamicData = ref(DynamicData())

watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel()
})

// 被勾选的动态列数据
// checkbox 而言它的 label值 就是值
export const selectDynamicLabel = ref([])

// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// table 的列数据
export const tableColumns = ref([])
watch(
  // 监听勾选label数组的变化, 筛选出被选中中的对象
  selectDynamicLabel,
  (labels) => {
    tableColumns.value = [] // 先置空
    const selectData = []
    dynamicData.value.forEach((obj) => {
      if (labels.includes(obj.label)) {
        selectData.push(obj)
      }
    })
    tableColumns.value = selectData
  },
  {
    immediate: true
  }
)
// 注意: watch 可以直接接受一个 ref , 并且 newValue 和 oldValue 是.value 本身, 不需要解构
