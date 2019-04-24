<template>
    <div class="PostComment">
      <div class="post_owner">
        <img class="owner_avatar" :src="'/'+comment.avatar">
        <p class="owner_name">{{comment.username}}</p>
        <p class="post_time">发表于{{addtime}}</p>
      </div>
      <p class="comment_content">{{comment.comment}}</p>

    </div>
</template>

<script>
    export default {
        name: 'PostComment',
      props:["comment"],
      data(){
          return{
            addtime:''
          }
      },
      mounted(){
        let $this = this;
        let date = new Date($this.comment.addtime * 1000);
        $this.addtime = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      }

    }
</script>

<style lang="scss" scoped>
.PostComment{
  position: relative;
  margin: 0.2rem 0;
  width: 100%;

.post_owner {
  position: relative;
  overflow: auto;
  margin-bottom: 0.1rem;
  width: 9.6rem;

.owner_avatar {
  float: left;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}

.owner_name {

  line-height: 0.5rem;
  color: #000;
  font-size: 0.4rem;
  text-align: left;
}

.post_time {

  line-height: 0.5rem;
  color: #666;
  font-size: 0.3rem;
  text-align: left;
}

}

.comment_content{
  text-align: left;
  position: relative;
  line-height: 1rem;
  color: #666;
  font-size: 0.4rem;
}

}
</style>
