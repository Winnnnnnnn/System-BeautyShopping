/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : beauty

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2019-06-10 23:50:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `name` varchar(255) NOT NULL COMMENT '管理员名称',
  `pwd` varchar(255) NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'YWRtaW4=');

-- ----------------------------
-- Table structure for big_sort
-- ----------------------------
DROP TABLE IF EXISTS `big_sort`;
CREATE TABLE `big_sort` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '大分类编号',
  `name` varchar(255) NOT NULL COMMENT '大分类名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of big_sort
-- ----------------------------
INSERT INTO `big_sort` VALUES ('1', '功效');
INSERT INTO `big_sort` VALUES ('2', '护肤');
INSERT INTO `big_sort` VALUES ('3', '彩妆');
INSERT INTO `big_sort` VALUES ('4', '香水');
INSERT INTO `big_sort` VALUES ('5', '工具');
INSERT INTO `big_sort` VALUES ('6', '男士护肤');
INSERT INTO `big_sort` VALUES ('7', '洗浴护体');
INSERT INTO `big_sort` VALUES ('8', '美发护发');

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车编号',
  `goodid` int(11) DEFAULT NULL COMMENT '商品编号',
  `userid` int(11) DEFAULT NULL COMMENT '用户编号',
  `count` int(11) NOT NULL COMMENT '购物车数量',
  PRIMARY KEY (`id`),
  KEY `car_goodid` (`goodid`),
  KEY `car_userid` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------

-- ----------------------------
-- Table structure for clubs
-- ----------------------------
DROP TABLE IF EXISTS `clubs`;
CREATE TABLE `clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '俱乐部id',
  `detail` text NOT NULL COMMENT '详细内容',
  `user` int(11) DEFAULT NULL COMMENT '发表人id',
  `time` varchar(255) NOT NULL COMMENT '发表时间',
  `likes` int(11) DEFAULT '0' COMMENT '点赞数',
  PRIMARY KEY (`id`),
  KEY `clubs_user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of clubs
-- ----------------------------

-- ----------------------------
-- Table structure for clubs_rev
-- ----------------------------
DROP TABLE IF EXISTS `clubs_rev`;
CREATE TABLE `clubs_rev` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复id',
  `detail` text NOT NULL COMMENT '回复内容',
  `user` int(11) DEFAULT NULL COMMENT '回复人',
  `club` int(11) DEFAULT NULL COMMENT '俱乐部编号',
  `time` varchar(255) NOT NULL COMMENT '回复时间',
  PRIMARY KEY (`id`),
  KEY `clubs_rev_club` (`club`),
  KEY `clubs_rev_user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of clubs_rev
-- ----------------------------

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品编号',
  `title` text NOT NULL COMMENT '商品标题',
  `detail` text NOT NULL COMMENT '商品描述',
  `brand` varchar(255) NOT NULL COMMENT '商品品牌',
  `sort` int(11) NOT NULL COMMENT '商品分类',
  `price` varchar(255) NOT NULL COMMENT '商品价格',
  `cover` text NOT NULL COMMENT '商品封面图',
  `img` text NOT NULL COMMENT '商品图片',
  `views` int(11) DEFAULT '0' COMMENT '查看次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for middle_sort
-- ----------------------------
DROP TABLE IF EXISTS `middle_sort`;
CREATE TABLE `middle_sort` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '中分类编号',
  `name` varchar(255) NOT NULL COMMENT '中分类名称',
  `big` int(11) DEFAULT NULL COMMENT '所属大分类',
  PRIMARY KEY (`id`),
  KEY `middle_big` (`big`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of middle_sort
-- ----------------------------
INSERT INTO `middle_sort` VALUES ('1', '清洁', '1');
INSERT INTO `middle_sort` VALUES ('2', '美白', '1');
INSERT INTO `middle_sort` VALUES ('3', '底妆修容', '1');
INSERT INTO `middle_sort` VALUES ('4', '抗老', '1');
INSERT INTO `middle_sort` VALUES ('5', '紧致', '1');
INSERT INTO `middle_sort` VALUES ('6', '保湿', '1');
INSERT INTO `middle_sort` VALUES ('7', '防晒', '1');
INSERT INTO `middle_sort` VALUES ('8', '控油', '1');
INSERT INTO `middle_sort` VALUES ('9', '百变妆容', '1');
INSERT INTO `middle_sort` VALUES ('10', '卸妆', '2');
INSERT INTO `middle_sort` VALUES ('11', '清洁', '2');
INSERT INTO `middle_sort` VALUES ('12', '面部护理', '2');
INSERT INTO `middle_sort` VALUES ('13', '面膜', '2');
INSERT INTO `middle_sort` VALUES ('14', '眼部护理', '2');
INSERT INTO `middle_sort` VALUES ('15', '唇部护理', '2');
INSERT INTO `middle_sort` VALUES ('16', '颈部护理', '2');
INSERT INTO `middle_sort` VALUES ('17', '美容仪', '2');
INSERT INTO `middle_sort` VALUES ('18', '惠选套装', '2');
INSERT INTO `middle_sort` VALUES ('19', '脸部彩妆', '3');
INSERT INTO `middle_sort` VALUES ('20', '眼部彩妆', '3');
INSERT INTO `middle_sort` VALUES ('21', '眉部彩妆', '3');
INSERT INTO `middle_sort` VALUES ('22', '唇部彩妆', '3');
INSERT INTO `middle_sort` VALUES ('23', '缤纷美甲', '3');
INSERT INTO `middle_sort` VALUES ('24', '身体彩绘', '3');
INSERT INTO `middle_sort` VALUES ('25', '整装彩盘', '3');
INSERT INTO `middle_sort` VALUES ('26', '惠选套装', '3');
INSERT INTO `middle_sort` VALUES ('27', '女士', '4');
INSERT INTO `middle_sort` VALUES ('28', '男士', '4');
INSERT INTO `middle_sort` VALUES ('29', '中性', '4');
INSERT INTO `middle_sort` VALUES ('30', '香水工具', '4');
INSERT INTO `middle_sort` VALUES ('31', '惠选套装', '4');
INSERT INTO `middle_sort` VALUES ('32', '惠选套装', '5');
INSERT INTO `middle_sort` VALUES ('33', '化妆工具', '5');
INSERT INTO `middle_sort` VALUES ('34', '护肤工具', '5');
INSERT INTO `middle_sort` VALUES ('35', '护体工具', '5');
INSERT INTO `middle_sort` VALUES ('36', '美发工具', '5');
INSERT INTO `middle_sort` VALUES ('37', '美甲工具', '5');
INSERT INTO `middle_sort` VALUES ('38', '其他工具', '5');
INSERT INTO `middle_sort` VALUES ('39', '唇部护理', '6');
INSERT INTO `middle_sort` VALUES ('40', '清洁', '6');
INSERT INTO `middle_sort` VALUES ('41', '剃须护理', '6');
INSERT INTO `middle_sort` VALUES ('42', '面部护理', '6');
INSERT INTO `middle_sort` VALUES ('43', '眼部护理', '6');
INSERT INTO `middle_sort` VALUES ('44', '惠选套装', '6');
INSERT INTO `middle_sort` VALUES ('45', '沐浴清洗', '7');
INSERT INTO `middle_sort` VALUES ('46', '身体护理', '7');
INSERT INTO `middle_sort` VALUES ('47', '手部护理', '7');
INSERT INTO `middle_sort` VALUES ('48', '胸部护理', '7');
INSERT INTO `middle_sort` VALUES ('49', '足部护理', '7');
INSERT INTO `middle_sort` VALUES ('50', '口腔护理', '7');
INSERT INTO `middle_sort` VALUES ('51', '惠选套装', '7');
INSERT INTO `middle_sort` VALUES ('52', '洗发产品', '8');
INSERT INTO `middle_sort` VALUES ('53', '头发护理', '8');
INSERT INTO `middle_sort` VALUES ('54', '护发产品', '8');
INSERT INTO `middle_sort` VALUES ('55', '美发产品', '8');
INSERT INTO `middle_sort` VALUES ('56', '惠选套装', '8');

-- ----------------------------
-- Table structure for min_sort
-- ----------------------------
DROP TABLE IF EXISTS `min_sort`;
CREATE TABLE `min_sort` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '小分类编号',
  `name` varchar(255) NOT NULL COMMENT '小分类名称',
  `middle` int(11) DEFAULT NULL COMMENT '所属中分类',
  PRIMARY KEY (`id`),
  KEY `min_middle` (`middle`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of min_sort
-- ----------------------------
INSERT INTO `min_sort` VALUES ('1', '去角质', '1');
INSERT INTO `min_sort` VALUES ('2', '卸妆清洁', '1');
INSERT INTO `min_sort` VALUES ('3', '淡斑', '2');
INSERT INTO `min_sort` VALUES ('4', '提亮肤色', '2');
INSERT INTO `min_sort` VALUES ('5', '淡化黑眼圈', '2');
INSERT INTO `min_sort` VALUES ('6', '提亮肤色', '3');
INSERT INTO `min_sort` VALUES ('7', '遮瑕', '3');
INSERT INTO `min_sort` VALUES ('8', '隔离', '3');
INSERT INTO `min_sort` VALUES ('9', '抗污染', '4');
INSERT INTO `min_sort` VALUES ('10', '抗皱', '4');
INSERT INTO `min_sort` VALUES ('11', '抗氧化', '4');
INSERT INTO `min_sort` VALUES ('12', '淡化细纹', '5');
INSERT INTO `min_sort` VALUES ('13', '提拉紧致', '5');
INSERT INTO `min_sort` VALUES ('14', '舒缓', '6');
INSERT INTO `min_sort` VALUES ('15', '保湿补水', '6');
INSERT INTO `min_sort` VALUES ('16', '防晒', '7');
INSERT INTO `min_sort` VALUES ('17', '晒后防护', '7');
INSERT INTO `min_sort` VALUES ('18', '细致毛孔', '8');
INSERT INTO `min_sort` VALUES ('19', '祛痘', '8');
INSERT INTO `min_sort` VALUES ('20', '炫色金属', '9');
INSERT INTO `min_sort` VALUES ('21', '魅惑哑光', '9');
INSERT INTO `min_sort` VALUES ('22', '亮泽水光', '9');
INSERT INTO `min_sort` VALUES ('23', '清新自然', '9');
INSERT INTO `min_sort` VALUES ('24', '卸妆啫喱', '10');
INSERT INTO `min_sort` VALUES ('25', '卸妆液', '10');
INSERT INTO `min_sort` VALUES ('26', '卸妆乳', '10');
INSERT INTO `min_sort` VALUES ('27', '卸妆油', '10');
INSERT INTO `min_sort` VALUES ('28', '卸妆巾', '10');
INSERT INTO `min_sort` VALUES ('29', '套装', '10');
INSERT INTO `min_sort` VALUES ('30', '磨砂去角质', '11');
INSERT INTO `min_sort` VALUES ('31', '洁面乳/霜', '11');
INSERT INTO `min_sort` VALUES ('32', '洁面泡沫', '11');
INSERT INTO `min_sort` VALUES ('33', '洁面啫喱', '11');
INSERT INTO `min_sort` VALUES ('34', '洁肤水', '11');
INSERT INTO `min_sort` VALUES ('35', '洁面皂', '11');
INSERT INTO `min_sort` VALUES ('36', '化妆水', '12');
INSERT INTO `min_sort` VALUES ('37', '面部精华', '12');
INSERT INTO `min_sort` VALUES ('38', '乳液/面霜', '12');
INSERT INTO `min_sort` VALUES ('39', '面部护理油', '12');
INSERT INTO `min_sort` VALUES ('40', 'BB/CC霜', '12');
INSERT INTO `min_sort` VALUES ('41', '隔离/防晒霜', '12');
INSERT INTO `min_sort` VALUES ('42', '喷雾', '12');
INSERT INTO `min_sort` VALUES ('43', '套装', '12');
INSERT INTO `min_sort` VALUES ('44', '免洗面膜', '13');
INSERT INTO `min_sort` VALUES ('45', '水洗面膜', '13');
INSERT INTO `min_sort` VALUES ('46', '泡泡面膜', '13');
INSERT INTO `min_sort` VALUES ('47', '片状面膜', '13');
INSERT INTO `min_sort` VALUES ('48', '撕拉式面膜', '13');
INSERT INTO `min_sort` VALUES ('49', '套装', '13');
INSERT INTO `min_sort` VALUES ('50', '眼部精华', '14');
INSERT INTO `min_sort` VALUES ('51', '眼霜', '14');
INSERT INTO `min_sort` VALUES ('52', '眼膜', '14');
INSERT INTO `min_sort` VALUES ('53', '套装', '14');
INSERT INTO `min_sort` VALUES ('54', '唇膜', '15');
INSERT INTO `min_sort` VALUES ('55', '润唇膏', '15');
INSERT INTO `min_sort` VALUES ('56', '唇霜', '15');
INSERT INTO `min_sort` VALUES ('57', '套装', '15');
INSERT INTO `min_sort` VALUES ('58', '颈霜', '16');
INSERT INTO `min_sort` VALUES ('59', '美容仪配件', '17');
INSERT INTO `min_sort` VALUES ('60', '美容仪', '17');
INSERT INTO `min_sort` VALUES ('61', '套装', '17');
INSERT INTO `min_sort` VALUES ('62', '惠选套装', '18');
INSERT INTO `min_sort` VALUES ('63', '脸部彩妆', '19');
INSERT INTO `min_sort` VALUES ('64', '妆前乳', '19');
INSERT INTO `min_sort` VALUES ('65', '粉底液/霜', '19');
INSERT INTO `min_sort` VALUES ('66', '脸部遮瑕', '19');
INSERT INTO `min_sort` VALUES ('67', '粉饼', '19');
INSERT INTO `min_sort` VALUES ('68', '腮红', '19');
INSERT INTO `min_sort` VALUES ('69', '修颜粉/液', '19');
INSERT INTO `min_sort` VALUES ('70', '闪粉', '19');
INSERT INTO `min_sort` VALUES ('71', '散粉/蜜粉', '19');
INSERT INTO `min_sort` VALUES ('72', '定妆喷雾/水', '19');
INSERT INTO `min_sort` VALUES ('73', '眼部底膏', '20');
INSERT INTO `min_sort` VALUES ('74', '眼部遮瑕', '20');
INSERT INTO `min_sort` VALUES ('75', '眼线', '20');
INSERT INTO `min_sort` VALUES ('76', '眼影', '20');
INSERT INTO `min_sort` VALUES ('77', '睫毛打底液', '20');
INSERT INTO `min_sort` VALUES ('78', '睫毛膏', '20');
INSERT INTO `min_sort` VALUES ('79', '眉笔', '21');
INSERT INTO `min_sort` VALUES ('80', '眉粉/膏', '21');
INSERT INTO `min_sort` VALUES ('81', '套装', '21');
INSERT INTO `min_sort` VALUES ('82', '润唇膏', '22');
INSERT INTO `min_sort` VALUES ('83', '唇釉', '22');
INSERT INTO `min_sort` VALUES ('84', '唇彩', '22');
INSERT INTO `min_sort` VALUES ('85', '唇膏', '22');
INSERT INTO `min_sort` VALUES ('86', '唇线笔', '22');
INSERT INTO `min_sort` VALUES ('87', '指甲油', '23');
INSERT INTO `min_sort` VALUES ('88', '卸甲水', '23');
INSERT INTO `min_sort` VALUES ('89', '美甲贴', '23');
INSERT INTO `min_sort` VALUES ('90', '美甲护理', '23');
INSERT INTO `min_sort` VALUES ('91', '身体彩绘', '24');
INSERT INTO `min_sort` VALUES ('92', '套装', '25');
INSERT INTO `min_sort` VALUES ('93', '彩盘', '25');
INSERT INTO `min_sort` VALUES ('94', '惠选套装', '26');
INSERT INTO `min_sort` VALUES ('95', '淡香', '27');
INSERT INTO `min_sort` VALUES ('96', '浓香', '27');
INSERT INTO `min_sort` VALUES ('97', '滚珠', '27');
INSERT INTO `min_sort` VALUES ('98', '香精', '27');
INSERT INTO `min_sort` VALUES ('99', '香发喷雾', '27');
INSERT INTO `min_sort` VALUES ('100', '香氛沐浴露', '27');
INSERT INTO `min_sort` VALUES ('101', '香体乳/喷雾', '27');
INSERT INTO `min_sort` VALUES ('102', '香氛蜡烛', '27');
INSERT INTO `min_sort` VALUES ('103', '礼盒套装', '27');
INSERT INTO `min_sort` VALUES ('104', '淡香', '28');
INSERT INTO `min_sort` VALUES ('105', '浓香', '28');
INSERT INTO `min_sort` VALUES ('106', '古龙水', '28');
INSERT INTO `min_sort` VALUES ('107', '香氛沐浴露', '28');
INSERT INTO `min_sort` VALUES ('108', '礼盒套装', '28');
INSERT INTO `min_sort` VALUES ('109', '淡香', '29');
INSERT INTO `min_sort` VALUES ('110', '古龙水', '29');
INSERT INTO `min_sort` VALUES ('111', '香氛沐浴露', '29');
INSERT INTO `min_sort` VALUES ('112', '香体乳/粉/油', '29');
INSERT INTO `min_sort` VALUES ('113', '礼盒套装', '29');
INSERT INTO `min_sort` VALUES ('114', '香水瓶套', '30');
INSERT INTO `min_sort` VALUES ('115', '惠选套装', '31');
INSERT INTO `min_sort` VALUES ('116', '惠选套装', '32');
INSERT INTO `min_sort` VALUES ('117', '眉刷', '33');
INSERT INTO `min_sort` VALUES ('118', '眼线刷', '33');
INSERT INTO `min_sort` VALUES ('119', '眼影刷', '33');
INSERT INTO `min_sort` VALUES ('120', '底妆刷', '33');
INSERT INTO `min_sort` VALUES ('121', '散粉刷', '33');
INSERT INTO `min_sort` VALUES ('122', '腮红刷', '33');
INSERT INTO `min_sort` VALUES ('123', '唇刷', '33');
INSERT INTO `min_sort` VALUES ('124', '粉扑', '33');
INSERT INTO `min_sort` VALUES ('125', '化妆海绵', '33');
INSERT INTO `min_sort` VALUES ('126', '修眉工具', '33');
INSERT INTO `min_sort` VALUES ('127', '睫毛夹', '33');
INSERT INTO `min_sort` VALUES ('128', '烫睫毛器', '33');
INSERT INTO `min_sort` VALUES ('129', '彩妆套刷', '33');
INSERT INTO `min_sort` VALUES ('130', '其他化妆工具', '33');
INSERT INTO `min_sort` VALUES ('131', '去痘棒', '34');
INSERT INTO `min_sort` VALUES ('132', '化妆棉', '34');
INSERT INTO `min_sort` VALUES ('133', '其他护肤工具', '34');
INSERT INTO `min_sort` VALUES ('134', '护体工具', '35');
INSERT INTO `min_sort` VALUES ('135', '卷发器', '36');
INSERT INTO `min_sort` VALUES ('136', '指甲锉', '37');
INSERT INTO `min_sort` VALUES ('137', '其他美甲工具', '37');
INSERT INTO `min_sort` VALUES ('138', '化妆包/箱', '38');
INSERT INTO `min_sort` VALUES ('139', '化妆镜', '38');
INSERT INTO `min_sort` VALUES ('140', '香水瓶', '38');
INSERT INTO `min_sort` VALUES ('141', '其他', '38');
INSERT INTO `min_sort` VALUES ('142', '唇部护理', '39');
INSERT INTO `min_sort` VALUES ('143', '润唇膏', '39');
INSERT INTO `min_sort` VALUES ('144', '磨砂去角质', '40');
INSERT INTO `min_sort` VALUES ('145', '洁面乳/霜', '40');
INSERT INTO `min_sort` VALUES ('146', '洁面啫喱', '40');
INSERT INTO `min_sort` VALUES ('147', '洁面皂', '40');
INSERT INTO `min_sort` VALUES ('148', '剃须泡沫', '41');
INSERT INTO `min_sort` VALUES ('149', '剃须啫喱', '41');
INSERT INTO `min_sort` VALUES ('150', '剃须液', '41');
INSERT INTO `min_sort` VALUES ('151', '须后水/乳', '41');
INSERT INTO `min_sort` VALUES ('152', '爽肤水', '42');
INSERT INTO `min_sort` VALUES ('153', '面部精华', '42');
INSERT INTO `min_sort` VALUES ('154', '乳液/面霜', '42');
INSERT INTO `min_sort` VALUES ('155', '面膜', '42');
INSERT INTO `min_sort` VALUES ('156', 'BB霜', '42');
INSERT INTO `min_sort` VALUES ('157', '隔离/防晒霜', '42');
INSERT INTO `min_sort` VALUES ('158', '套装', '42');
INSERT INTO `min_sort` VALUES ('159', '眼部精华', '43');
INSERT INTO `min_sort` VALUES ('160', '眼霜', '43');
INSERT INTO `min_sort` VALUES ('161', '惠选套装', '44');
INSERT INTO `min_sort` VALUES ('162', '磨砂去角质', '45');
INSERT INTO `min_sort` VALUES ('163', '沐浴香皂', '45');
INSERT INTO `min_sort` VALUES ('164', '沐浴露', '45');
INSERT INTO `min_sort` VALUES ('165', '沐浴块', '45');
INSERT INTO `min_sort` VALUES ('166', '套装', '45');
INSERT INTO `min_sort` VALUES ('167', '美体仪', '46');
INSERT INTO `min_sort` VALUES ('168', '乳霜', '46');
INSERT INTO `min_sort` VALUES ('169', '护理油', '46');
INSERT INTO `min_sort` VALUES ('170', '防晒', '46');
INSERT INTO `min_sort` VALUES ('171', '套装', '46');
INSERT INTO `min_sort` VALUES ('172', '喷雾', '46');
INSERT INTO `min_sort` VALUES ('173', '清洁', '46');
INSERT INTO `min_sort` VALUES ('174', '洗手液', '47');
INSERT INTO `min_sort` VALUES ('175', '乳霜', '47');
INSERT INTO `min_sort` VALUES ('176', '护理膜', '47');
INSERT INTO `min_sort` VALUES ('177', '乳霜', '48');
INSERT INTO `min_sort` VALUES ('178', '乳霜', '49');
INSERT INTO `min_sort` VALUES ('179', '护理膜', '49');
INSERT INTO `min_sort` VALUES ('180', '牙刷', '50');
INSERT INTO `min_sort` VALUES ('181', '配件', '50');
INSERT INTO `min_sort` VALUES ('182', '惠选套装', '51');
INSERT INTO `min_sort` VALUES ('183', '洗发水/液', '52');
INSERT INTO `min_sort` VALUES ('184', '洗发喷雾', '52');
INSERT INTO `min_sort` VALUES ('185', '套装', '52');
INSERT INTO `min_sort` VALUES ('186', '精华素', '53');
INSERT INTO `min_sort` VALUES ('187', '护发素', '54');
INSERT INTO `min_sort` VALUES ('188', '精华素', '54');
INSERT INTO `min_sort` VALUES ('189', '发膜/霜', '54');
INSERT INTO `min_sort` VALUES ('190', '精油', '54');
INSERT INTO `min_sort` VALUES ('191', '弹力素', '55');
INSERT INTO `min_sort` VALUES ('192', '发胶/蜡', '55');
INSERT INTO `min_sort` VALUES ('193', '染发', '55');
INSERT INTO `min_sort` VALUES ('194', '惠选套装', '56');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `userid` int(11) DEFAULT NULL COMMENT '用户编号',
  `list` text NOT NULL COMMENT '商品列表',
  `time` varchar(255) NOT NULL COMMENT '订单时间',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '订单状态',
  `total` varchar(255) NOT NULL COMMENT '订单总额',
  PRIMARY KEY (`id`),
  KEY `orders_user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `phone` varchar(255) NOT NULL COMMENT '用户手机',
  `name` varchar(255) NOT NULL COMMENT '用户姓名',
  `pwd` varchar(255) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
