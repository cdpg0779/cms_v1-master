<template>
    <Row>
        <Col span="8" class="box_card" v-for="item in company">
            <Card>
                <p slot="title" class="title"  v-on:click="click_card(item)">{{item.name}}</p>
                <p>
                    <Row>
                        <Col span="24">法定代表人：{{item.linkMan}}</Col>
                        <Col span="24">成立日期：{{item.createTime}}</Col>
                        <Col span="24">企业类型：{{item.type}}</Col>
                        <Col span="24">注册资本：{{item.ziben}}</Col>
                        <Col span="24">电话号码：{{item.linkPhone}}</Col>
                        <Col span="24">所在地址：{{item.adress}}</Col>
                    </Row>
                </p>
            </Card>
        </Col>
    </Row>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      company: []
    };
  },
  methods: {
    click_card: function(company) {
      this.$router.push({
        path: "/xinxichaxun/company_info_more",
        query: { id: company.id }
      });
    },
    get_data: function() {
      var d = this;
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getCompanyList"
      })
        .then(function(res) {
          d.$data.company = res.data.rows;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted: function() {
    this.get_data();
  }
};
</script>
<style scoped>
.box_card {
  padding: 7px;
}
.title {
  color: #ef6421;
  font-size: 20px;
}
</style>
