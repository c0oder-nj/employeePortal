const express = require('express');
const customerPortalController = require('../Controllers/allControllers');
const router = express.Router();



router.post('/login', customerPortalController.login);

router.get('/dashboard', customerPortalController.dashboard);



router.get('/profile_detail', customerPortalController.profileData);

router.get('/prodcut_replacment_report', customerPortalController.replacmentReport);

router.get('/bill_report', customerPortalController.billReport);

router.get('/bill_print', customerPortalController.billPrint);

router.get('/complain_report', customerPortalController.complainReport);

router.get('/company_code_list', customerPortalController.companyList);

router.get('/account_statment', customerPortalController.accountStatment);

router.get('/material_stock', customerPortalController.materialStock);

router.get('/complain_list', customerPortalController.complainList);

router.get('/product_list', customerPortalController.productList);

router.get('/biling_list', customerPortalController.billList);


//POST SUBMIT API

router.post('/create_bill', customerPortalController.createBill);

router.post('/submit_replaced_product',customerPortalController.submitReplaceProduct);

router.post('/submit_complain',customerPortalController.submitComplian);

module.exports = router;