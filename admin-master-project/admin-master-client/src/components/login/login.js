import React ,{Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import './login.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e){
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        console.info("表单值：",data);
        this.props.history.replace('/home');
        window.localStorage.setItem('isLogin', true);
        
        
        
        
        // let url = '/webapi/sysuser/login';
        // let that = this;  
        // axios.post(url,data)
        // .then(function (response) {
        //     if(response.data.success){
        //         console.log(response.data.mess);
        //         console.log(that);
        //         console.log(that.props);
        //         that.props.history.replace('/home');
        //     }else{
        //         console.log(response.data.mess);
        //     }
        // })
        // .catch(function (response) {
        //     console.log(response);
        // });
    }

    render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form className="login-form" onSubmit={(e)=>this.handleSubmit(e)} >
        <FormItem>
            {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
            })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
            })(
            <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码?</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
            登 陆
            </Button>
        </FormItem>
        </Form>
    );
    }
}
const Login = Form.create()(LoginForm);
export default Login;