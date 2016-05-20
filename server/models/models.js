var db = require('../db');
var Food = db.import('./Food');
var FoodCategory = db.import('./FoodCategory');
var FoodOrder = db.import('./FoodOrder');
var Order = db.import('./Order');
var Session = db.import('./Session');
var Shop = db.import('./Shop');
var User = db.import('./User');

Shop.hasMany(FoodCategory, { foreignKey: 'shopId', as: 'categories', onDelete: 'cascade' });
FoodCategory.belongsTo(Shop, { foreignKey: 'shopId', as: 'shop', onDelete: 'cascade' });

Shop.hasMany(Session, { foreignKey: 'shopId', as: 'sessions', onDelete: 'cascade' });
Session.belongsTo(Shop, { foreignKey: 'shopId', as: 'shop', onDelete: 'cascade' });

FoodCategory.hasMany(Food, { foreignKey: 'categoryId', as: 'foods', onDelete: 'cascade' });
Food.belongsTo(FoodCategory, { foreignKey: 'categoryId', as: 'category', onDelete: 'cascade' });

User.hasMany(Session, { foreignKey: 'userId', as: 'sessions', onDelete: 'cascade' });
Session.belongsTo(User, { foreignKey: 'userId', as: 'owner', onDelete: 'cascade' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'cascade' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'owner', onDelete: 'cascade' });

Session.hasMany(Order, { foreignKey: 'sessionId', as: 'orders', onDelete: 'cascade' });
Order.belongsTo(Session, { foreignKey: 'sessionId', as: 'session', onDelete: 'cascade' });

Food.hasMany(FoodOrder, { foreignKey: 'foodId', as: 'foodOrders', onDelete: 'cascade' });
FoodOrder.belongsTo(Food, { foreignKey: 'foodId', as: 'food', onDelete: 'cascade' });

Order.hasMany(FoodOrder, { foreignKey: 'orderId', as: 'foodOrders', onDelete: 'cascade' });
FoodOrder.belongsTo(Order, { foreignKey: 'orderId', as: 'order', onDelete: 'cascade' });

exports.Food = Food;
exports.FoodCategory = FoodCategory;
exports.FoodOrder = FoodOrder;
exports.Order = Order;
exports.Session = Session;
exports.Shop = Shop;
exports.User = User;
