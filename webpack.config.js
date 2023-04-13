const path=require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const CopyPlugin=require('copy-webpack-plugin');
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');
const TerserPlugin=require('terser-webpack-plugin');
const Dotenv=require('dotenv-webpack');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[contenthash].js',
        assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    resolve:{
        extensions:['.js'],
        alias:{
            '@images':path.resolve('src/assets/images/'),
            '@templates':path.resolve('src/templates/'),
            '@utils':path.resolve('src/utils/'),
            '@styles':path.resolve('src/styles/'),
        }
    },
    module:{
        rules:[
        {
            test:/\.m?js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader',
            }
        },
        {
            test:/\.css$/i,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
            ]
        },
        {
            test:/\.(png|svg|jpg|jpeg|gif)$/i,
            type:'asset/resource',
        },{
            test:/\.woff$/,
            type:"asset/resource",
            generator:{
                filename:"assets/fonts/[name].[contenthash].[ext]"
            }
        }
    ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template:'./public/index.html',
            filename:'./index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name][contenthash].css'
        }
        ),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"src", "assets/images"),
                    to:"assets/images"
                }
            ]
        }),
        new Dotenv({
            path:'.env',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize:true,
        minimizer:[
        new CssMinimizerPlugin(),
        new TerserPlugin(),
        ]
    }
}