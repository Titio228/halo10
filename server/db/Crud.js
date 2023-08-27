const mysql = require("mysql");
const check = require("../function/Checking");

/**================================================================
 * Create database and connect
 ================================================================*/
const conn = mysql.createPool({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "db_test",
});

/**================================================================
 * Display all users
 ================================================================*/
const displayAllDead = () => {
  return new Promise((resolve, reject) => {
    const status_user = "dead";
    let sql =
      "SELECT lastname, firstname, birthday, dead, sex FROM user WHERE status_user LIKE ? ORDER BY lastname ASC, firstname ASC";
    conn.query(sql, [status_user], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Display all subscription
 ================================================================*/
const displayAllSubscription = () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT subscription.id, subscription.price, GROUP_CONCAT(benefit.avantage SEPARATOR '\n') AS all_avantages from benefit LEFT JOIN subscription on subscription.id = benefit.id_subscription GROUP BY subscription.price";
    conn.query(sql, (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Display subscription by id
 ================================================================*/
const displaySubscriptionById = (price) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT id FROM subscription WHERE price = ?";
    conn.query(sql, [price], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Display user by name
 ================================================================*/
const displayDeadByName = (name) => {
  return new Promise((resolve, reject) => {
    const nameMysql = `%${name}%`;
    const status_user = "dead";
    let sql =
      "SELECT lastname, firstname, birthday, dead, sex FROM user WHERE lastname LIKE ? AND status_user LIKE ? ORDER BY lastname ASC, firstname ASC";
    conn.query(sql, [nameMysql, status_user], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Insert user
 ================================================================*/
const insert = (
  lastName,
  firstName,
  birthday,
  email,
  phone,
  sex,
  password,
  confirmPassword
) => {
  return new Promise((resolve, reject) => {
    try {
      if (check.checkEmail(email)) {
        switch (check.checkPassword(password)) {
          case 1:
            throw new Error("WhiteSpace is not allowed");
          case 2:
            throw new Error("One uppercase Letter minimum required");
          case 3:
            throw new Error("One lowercase Letter minimum required");
          case 4:
            throw new Error("One number minimum required");
          case 5:
            throw new Error("One symbol minimum required");
          case 6:
            throw new Error("Length minimum required is between 10 - 16");
          default:
            const firstNameTransform = check.nameTransformFormat(firstName);
            let sql =
              "INSERT INTO user (lastname, firstname, firstnametransform, birthday, email, phone, sex, password_user, confirm_password_user) VALUES (?,?,?,?,?,?,?,?,?)";
            conn.query(
              sql,
              [
                lastName,
                firstName,
                firstNameTransform,
                birthday,
                email,
                phone,
                sex,
                password,
                confirmPassword,
              ],
              (err, rows) => {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(rows);
                }
              }
            );
        }
      } else {
        throw new Error("Email not valid");
      }
    } catch (e) {
      return reject(e.message);
    }
  });
};

/**================================================================
 * Insert price subscription
 ================================================================*/

const insertPriceSubscription = (price, sold) => {
  return new Promise((resolve, reject) => {
    try {
      let sql = "INSERT INTO subscription (price, sold) VALUES (?,?)";
      conn.query(sql, [price, sold], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(rows);
        }
      });
    } catch (e) {
      return reject(e.message);
    }
  });
};

/**================================================================
 * Bring last ID subscription
 ================================================================*/

const bringLastId = () => {
  return new Promise((resolve, reject) => {
    try {
      let sql = "SELECT id FROM subscription ORDER BY created_at DESC LIMIT 1";
      conn.query(sql, (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(rows);
        }
      });
    } catch (e) {
      return reject(e.message);
    }
  });
};

/**================================================================
 * Insert avantage subscription
 ================================================================*/

const insertAvantageSubscription = (avantage, id_subscription) => {
  return new Promise((resolve, reject) => {
    try {
      for (const item of avantage) {
        let sql =
          "INSERT INTO benefit (avantage, id_subscription) VALUES (?,?)";
        conn.query(sql, [item.value, id_subscription], (err, rows) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(rows);
          }
        });
      }
    } catch (e) {
      return reject(e.message);
    }
  });
};

/**================================================================
 * Checking login
 ================================================================*/
const checkLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      let sql =
        "SELECT email, password_user FROM user WHERE email = ? AND password_user = ?";

      conn.query(sql, [email, password], (err, row) => {
        console.log(row.length);
        if (err) {
          return reject("Email ou password not valid");
        } else if (row.length < 1) {
          return reject("Email ou password not valid");
        } else {
          return resolve(row);
        }
      });
    } catch (error) {
      return reject(error.message);
    }
  });
};

/**================================================================
 * Update user by name
 ================================================================*/
const update = (
  lastName,
  firstName,
  birthday,
  email,
  phone,
  password,
  confirmPassword
) => {
  return new Promise((resolve, reject) => {
    try {
      if (check.checkEmail(email)) {
        const firstNameTransform = check.nameTransformFormat(firstName);
        let sql =
          "UPDATE user set lastname = ?, firstname = ?, name_transformation = ?, birthday = ?, email = ?, phone = ?, password_user = ?, confirm_password_user = ? WHERE email = ?";
        conn.query(
          sql,
          [
            lastName,
            firstName,
            firstNameTransform,
            birthday,
            email,
            phone,
            password,
            confirmPassword,
          ],
          (err, rows) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(rows);
            }
          }
        );
      } else {
        throw new Error("Email is not valid");
      }
    } catch (e) {
      return reject(e.message);
    }
  });
};

/**================================================================
 * Delete user by name
 ================================================================*/
const deleteByName = (email) => {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM user WHERE email = ?";
    conn.query(sql, [email], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Delete all users
 ================================================================*/
const deleteAll = () => {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM user";
    conn.query(sql, (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Delete benefit by id
 ================================================================*/
const deleteBenefit = (id) => {
  return new Promise((resolve, reject) => {
    console.log("==> " + id);
    let sql = "DELETE FROM benefit WHERE id_subscription = ?";
    conn.query(sql, [id], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

/**================================================================
 * Delete subscription by id
 ================================================================*/
const deleteSubscription = (id) => {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM subscription WHERE id = ?";
    conn.query(sql, [id], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

module.exports = {
  displayAllDead,
  displayAllSubscription,
  insert,
  displayDeadByName,
  update,
  deleteByName,
  deleteAll,
  checkLogin,
  insertPriceSubscription,
  insertAvantageSubscription,
  bringLastId,
  displaySubscriptionById,
  deleteSubscription,
  deleteBenefit,
};
