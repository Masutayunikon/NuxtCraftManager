

<script setup lang="ts">

import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

interface Props {
  navigation: {
    name: string
    href: string
    current: boolean
    icon: any
  }[]
  teams?: {
    name: string
    href: string
    current: boolean
    initial: string
  }[]
  open?: boolean
}

const props = defineProps<Props>();

const sidebarOpen = ref(props.open ?? false);

</script>

<style scoped lang="scss">

</style>
