<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    totalItems: Number,
    itemsPerPage: Number,
    currentPage: Number,
});

const emit = defineEmits(["update:currentPage"]);

const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.itemsPerPage)
);

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        emit("update:currentPage", page);
    }
};

const prevPage = () => {
    if (props.currentPage > 1) {
        emit("update:currentPage", props.currentPage - 1);
    }
};

const nextPage = () => {
    if (props.currentPage < totalPages.value) {
        emit("update:currentPage", props.currentPage + 1);
    }
};
</script>


<template>
    <div class="pagination-root-two my-10">
        <button
            @click="prevPage"
            title="previous"
            type="button"
            class="pagination-button-two prev-button-two"
        >
            <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon-two"
            >
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
                'pagination-button-two',
                { 'active-two': page === currentPage },
            ]"
            :title="'Page ' + page"
        >
            {{ page }}
        </button>
        <button
            @click="nextPage"
            title="next"
            type="button"
            class="pagination-button-two next-button-two"
        >
            <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon-two"
            >
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
    </div>
</template>


<style>
:root {
    --button-bg-two: #f9f9f9;
    --button-border-two: #e0e0e0;
    --button-text-two: #072103;
    --button-text-active-two: rgb(134 239 172);
    --button-shadow-two: #eeeeeec0;
}

.pagination-root-two {
    display: flex;
    justify-content: center;
    gap: 0.25rem; /* space-x-1 */
    color: var(--button-text-two);
}

.pagination-button-two {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem; /* w-8 */
    height: 2rem; /* h-8 */
    border: 1px solid var(--button-border-two);
    border-radius: 0.375rem; /* rounded-md */
    box-shadow: var(--button-shadow-two);
    background-color: var(--button-bg-two);
    cursor: pointer;
    font-size: 0.875rem; /* text-sm */
    font-weight: 600; /* font-semibold */
}

.pagination-button-two.active-two {
    color: var(--button-text-active-two);
    border-color: var(--button-text-active-two);
}

.prev-button-two,
.next-button-two {
    padding: 0; /* py-0 */
}

.icon-two {
    width: 1rem; /* w-4 */
    height: 1rem;
}

.prev-button-two:hover,
.next-button-two:hover {
    color: var(--button-text-active-two);
}

.pagination-button-two:hover {
    color: var(--button-text-active-two);
    border-color: var(--button-text-active-two);
}
</style>
