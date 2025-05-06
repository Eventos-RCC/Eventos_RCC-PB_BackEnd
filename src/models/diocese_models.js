import { DataTypes, Model } from "sequelize";

class Diocese extends Model {
  static init(connection) {
    super.init(
      {
        diocese_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: "dioceses",
        schema: "rcc",
        underscored: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: "diocese_id",
      as: "diocese_users",
    });
  }
}

export default Diocese;