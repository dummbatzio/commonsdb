<script setup lang="ts">
import {
    Button,
} from '@/components/ui/button'

import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination'

interface PaginationCompositionProps {
    total: number;
    itemsPerPage?: number;
    defaultPage?: number;
}
defineProps<PaginationCompositionProps>()

const emit = defineEmits(["update:page"])

const route = useRoute()
const router = useRouter()
const onUpdatePage = (pageNumber: number) => {
    router.push({
        query: { ...route.query, p: pageNumber.toString() },
    })
}
</script>

<template>
    <Pagination v-slot="{ page }" :total="total" :items-per-page="itemsPerPage ?? 25" :sibling-count="1" show-edges
        :default-page="defaultPage ?? 1" @update:page="onUpdatePage">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
        </PaginationList>
    </Pagination>
</template>