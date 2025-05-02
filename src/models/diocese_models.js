import { DataTypes, Model } from "sequelize";

class Diocese extends Model {
  static init(connection) {
    super.init(
      {
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