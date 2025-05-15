import { DataTypes, Model } from 'sequelize';

class Role extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "roles",
            schema: "rcc",
            underscored: true,
            timestamps: true,
        });
    }
    
    static associate(models) {
        this.belongsToMany(models.Permission, {
            through: 'roles_permissions',
            foreignKey: "role_id", // Chave em RolePermission que aponta para Role
            otherKey: "permission_id", // Chave em RolePermission que aponta para Permission
            as: "permissions"
        });
        this.belongsToMany(models.User, {
            through: 'users_roles',
            foreignKey: "role_id", // Chave em UserRole que aponta para Role
            otherKey: "user_id", // Chave em UserRole que aponta para User
            as: "users"
        });
    }
}

class Permission extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            action: DataTypes.STRING,
            resource: DataTypes.STRING,
            description: DataTypes.STRING,

        }, {
            sequelize,
            tableName: "permissions",
            schema: "rcc",
            underscored: true,
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["action", "resource"],
                    name: 'idx_action_resource',
                },
            ],
        });
    }
    static associate(models) {
        this.belongsToMany(models.Role, {
            through: 'roles_permissions',
            foreignKey: "permission_id", // Chave em RolePermission que aponta para Permission
            otherKey: "role_id", // Chave em RolePermission que aponta para Role
            as: "roles"
        });
    }
}

class RolePermission extends Model {
    static init(sequelize) {
        super.init({
            role_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },
            permission_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id',
                },
            },
        }, {
            sequelize,
            tableName: "roles_permissions",
            schema: "rcc",
            underscored: true,
            timestamps: false,
        });
    }
}

class UserRole extends Model{
    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "users",
                    key: 'id',
                },
            },
            role_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },
        }, {
            sequelize,
            tableName: "users_roles",
            schema: "rcc",
            underscored: true,
            timestamps: false,
        });
    }
}

export {Role, Permission, RolePermission, UserRole };