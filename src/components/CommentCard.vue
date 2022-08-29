<template>
    <section class="container">
        <div class="row">
            <div class="card elevation-2 col-10 mb-3 justify-space-around">
                <img class="pfp rounded img-fluid m-1" :src="comment.creator.picture" alt="" />
                <h5>{{ comment.creator.name }}</h5>
                <h6>{{ comment.body }}</h6>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: { comment: { type: Object, required: true } },
    setup() {
        return {}
    }
};


</script>

<style scoped lang="scss">
.pfp {
    max-height: 3vh;
    max-width: 3vh;
}
</style>