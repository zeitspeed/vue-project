<template>
    <div class="custom-page">
      <div class="container">
        <h2 class="air-title"><span class="iconfont iconfeiji"></span>
          <i>国内机票</i>
        </h2>
    
        <!-- 搜索广告栏 -->
        <el-row type="flex" justify="space-between">
            <!-- 搜索表单 -->
            <div>
              <SearchForm></SearchForm>
            </div>
  </el-row>
    
        <h2 class="air-sale-title">
          <span class="iconfont icontejiajipiao"></span>
          
        </h2>
      </div>
      <div class="contianer">
          <el-row  type="flex" justify="space-between">
  
              <!-- 顶部过滤列表 -->
              <div class="flights-content">
                  <!-- 过滤条件 -->
                  <div>
                      
                  </div>
                  
                  <!-- 航班头部布局 -->
                  <div>
                    <FlightsListHead></FlightsListHead>
                  
                  </div>
                  
                  
                  <!-- 航班信息 -->
                  <div>
                  <!-- 因为航班信息我们是封装在一个组件中显示的，因此需要把显示的数据传递到封装的组件中才能使用并显示
                   父子关系:当一个组件嵌套使用在另一个组件内的时候，则表示他们存在父子关系，被嵌套的那个组件叫“子组件”，反之就是“父组件”
                   问题: 如何把数据传递给封装的组件呢答:可以利用“父传子”技术实现实现方式:
                  第一步: 父组件中在子组件标签上自定义一个属性并把要传递的数据赋值给它
                  第二步: 子组件中，通过props属性声明第一步“自定义的属性名”来接收数据 -->                                                                                                
                      <FlightsItem :data="item"
                       v-for="item in renderData"
                       :key="item.id"></FlightsItem>
                       <el-row type="flex" justify="center">
                          <el-pagination
                           layout="prev, pager,next"
                           :page-size="pageSize"
                           :total="flightsData.total"
                           @current-change="CurrentChange">
                          </el-pagination>
                       </el-row>
                  </div>
              </div>
  
              <!-- 侧边栏 -->
              <div class="aside">
                  <!-- 侧边栏组件 -->
              </div>
          </el-row>
      </div>
    </div>
    </template>
    
    <script>
    import SearchForm from '@/components/air/searchForm.vue';
    import FlightsListHead from '@/components/air/flightsListHead.vue';
    import FlightsItem from '@/components/air/flightsItem.vue';
    export default {
     components:{ SearchForm,FlightsListHead , FlightsItem },
     data(){
      return{
        saleData:[],
        flightsData:{
                  flights:{},
                  info:{},
                  options:{}
      },
      renderData:[],
       pageIndex: 1,
       pageSize: 5
     }
    },
     mounted(){
      this.getAirsSale(),
      this.getAirList()
     },
     methods: {
      getAirsSale(){
        this.$axios({
          url: '/airs/sale'
        }).then(res=>{
          console.log('特价机票',res)
          this.saleData = res.data.data
        })
      },
      getAirList(){
          this.$axios({
              url:'/airs',
              params: this.$route.query
          }).then(res=>{
              this.flightsData = res.data
              this.getRenderData()
          })
      },
      getRenderData(){
      let start =(this.pageIndex-1)*5
      let end = this.pageIndex * this.pageSize
      this.renderData = this.flightsData.flights.slice(start,end)
      },
      CurrentChange(page){
          this.pageIndex = page
          this.getRenderData()
      }
     }
    }
    </script>
    
    <style scoped lang="less">
    .custom-page {
     width: 100%;
     height: 100vh;
     }
      .contianer{
          width:1000px;
          margin:20px auto;
      }
  
      .flights-content{
          width:950px;
          font-size:14px;
      }
  
      .aside{
          width:240px;
      } 
      .air-sale{
      border: 1px #ddd solid;
      padding:20px;
      margin-bottom:50px;
    
      .air-sale-pic{
        > div{
          width:225px;
          height:140px;
          position: relative;
          overflow: hidden;
    
          img{
            width:100%;
          }
    
          .layer-bar{
            position:absolute;
            bottom:0;
            left:0;
            background: rgba(0,0,0,0.5);
            color:#fff;
            height:30px;
            line-height: 30px;
            width:100%;
            box-sizing: border-box;
            padding: 0 15px;
            font-size: 14px;
    
            span:last-child{
              font-size:18px;
            }
          }
        }
      }
    }
    
    .air-sale-group{
      margin-top:20px;
      padding-top:8px;
      border-right:1px #eee solid;
    
      &:last-child{
        border-right:none;
      }
    
      .air-sale-row{
        font-size:12px;
        color:#666;
        margin-bottom:8px;
    
        .air-sale-price{
          color:orange;
          font-size: 20px;
        }
      }
    }
    
    .container{
      width:1000px;
      margin:0 auto;
    }
    
    .air-title{
      margin:15px 0;
      font-size:20px;
      font-weight: normal;
      color:orange;
    
      span{
        font-size:20px;
      }
    }
    
    .statement{
      margin:15px 0;
      border:1px #ddd solid;
      background:#f5f5f5;
      height: 58px;
      padding:10px 0;
      box-sizing:border-box;
    
      > div{
        text-align: center;
        line-height: 38px;
        border-right:1px #ddd solid;
    
        &:last-child{
          border-right: none;
        }
    
        *{
          vertical-align: middle;
        }
    
        i{
          font-size:30px;
        }
      }
    }
    
    .air-sale-title{
      margin:15px 0;
      font-size:20px;
      font-weight: normal;
      color:#409EFF;
    
      span{
        font-size:20px;
      }
    }
    .air-sale{
      border: 1px #ddd solid;
      padding:20px;
      margin-bottom:50px;
    
      .air-sale-pic{
        > div{
          width:225px;
          height:140px;
          position: relative;
          overflow: hidden;
    
          img{
            width:100%;
          }
    
          .layer-bar{
            position:absolute;
            bottom:0;
            left:0;
            background: rgba(0,0,0,0.5);
            color:#fff;
            height:30px;
            line-height: 30px;
            width:100%;
            box-sizing: border-box;
            padding: 0 15px;
            font-size: 14px;
    
            span:last-child{
              font-size:18px;
            }
          }
        }
      }
    }
    
    .air-sale-group{
      margin-top:20px;
      padding-top:8px;
      border-right:1px #eee solid;
    
      &:last-child{
        border-right:none;
      }
    
      .air-sale-row{
        font-size:12px;
        color:#666;
        margin-bottom:8px;
    
        .air-sale-price{
          color:orange;
          font-size: 20px;
        }
      }
    }
    
    .container{
      width:1000px;
      margin:0 auto;
    }
    
    .air-title{
      margin:15px 0;
      font-size:20px;
      font-weight: normal;
      color:orange;
    
      span{
        font-size:20px;
      }
    }
    
    .statement{
      margin:15px 0;
      border:1px #ddd solid;
      background:#f5f5f5;
      height: 58px;
      padding:10px 0;
      box-sizing:border-box;
    
      > div{
        text-align: center;
        line-height: 38px;
        border-right:1px #ddd solid;
    
        &:last-child{
          border-right: none;
        }
    
        *{
          vertical-align: middle;
        }
    
        i{
          font-size:30px;
        }
      }
    }
    
    .air-sale-title{
      margin:15px 0;
      font-size:20px;
      font-weight: normal;
      color:#409EFF;
    
      span{
        font-size:20px;
      }
    }
    </style>