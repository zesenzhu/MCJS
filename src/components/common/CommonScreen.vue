<template>
    <div id="CommonScreen">
    </div>
</template>

<script>
    export default {
        name: 'CommonScreen',
      props:["parameter"],
      watch:{
          parameter(val){
            let $this = this,$commonScreen=$("#CommonScreen");
            if(typeof val != "object"){
              $this.$Message("parameter必须是object",3000)
              return;
            }

            //操作 parameter
            console.log(val);

            if(val.shadow == false){

            }else{
              if(val.state == true)
                $commonScreen.fadeIn();
              else if(val.state == false)
                $commonScreen.fadeOut();
            }

          }
      },
      mounted(){
        let $this = this,$commonScreen=$("#CommonScreen");
        let $parameter =$this.parameter;

        if(typeof $parameter != "object"){
          $this.$Message("parameter必须是object",3000)
          return;
        }

        //操作 parameter

       if($parameter.shadowClose){
         $commonScreen.on("click",function (e) {
//           $commonScreen.fadeOut();
           $($parameter.parent.$el).slideUp();
           console.log($parameter.parent)
         })
       }

      }

    }
</script>

<style lang="scss">
  #CommonScreen{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: rgba(153, 153, 153, 0.8);

  }
</style>
