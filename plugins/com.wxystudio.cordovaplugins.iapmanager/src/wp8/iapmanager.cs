using System;
using System.Text;
using System.IO;
using System.Net;
//using System.Net.WebClient;

using System.Collections.Specialized;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Web.Http.Cors;

using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;
using System.Windows;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

//using System.Deployment;


/*

#if DEBUG
using MockIAPLib;
using Store = MockIAPLib;
#else
using Windows.ApplicationModel.Store;
using Store = Windows.ApplicationModel.Store;
#endif

*/

using Windows.ApplicationModel.Store;
using Store = Windows.ApplicationModel.Store;



namespace WPCordovaClassLib.Cordova.Commands
{
    [DataContract]
    public class Product
    {
        [DataMember]
        public string name = "";
        [DataMember]
        public string id = "";
        [DataMember]
        public string price = "";
        [DataMember]
        /*
        0 : invalid
        1 : Can purchase
        2 : Purchased
        */
        public int state = 0;
        
        public Product(string name, string id, string price, int state)
        {
            this.id = id;
            this.name = name;
            this.price = price;
            this.state = state;
        }
    }

    // ...
    public class iapmanager : BaseCommand
    {
        private bool inited = false;
        // ...
        public void ToUpper(string options)
        {
            string upperCase = JSON.JsonHelper.Deserialize<string[]>(options)[0].ToUpper();
            string responseString = "";

            //SendHTTPRequest("http://api.timezonedb.com/?key=SGAMR7ZV3RTU&lat=12.7833&lng=-4.75&format=json");
            //System.Console.WriteLine("Sent request.....");


            //SetupMockIAP();

            //ListProducts();


            upperCase += responseString;

            PluginResult result;
            if (upperCase != "")
            {
                result = new PluginResult(PluginResult.Status.OK, upperCase);
            }
            else
            {
                result = new PluginResult(PluginResult.Status.ERROR, upperCase);
            }


            DispatchCommandResult(result);
        }


        public void Init(string options = "")
        {/*
            if (inited)
            {
                DispatchCommandResult(new PluginResult(PluginResult.Status.OK));
                return;
            }
                
#if DEBUG
            MockIAP.Init();

            Debug.WriteLine("Hello World");
 
            MockIAP.RunInMockMode(true);
            MockIAP.SetListingInformation(1, "en-us", "A description", "1", "1 token");

            ProductListing p;

            for (int i=0; i<100; i++)
            {
                p = new ProductListing
                {
                    Name = "Numeral " + i,
                    ProductId = "com.fsrc.destinystars.lr__" + i,
                    ProductType = Windows.ApplicationModel.Store.ProductType.Consumable,
                    Keywords = new string[] { "image" },
                    Description = "An image",
                    FormattedPrice = "1.0",
                    Tag = string.Empty
                };
                MockIAP.AddProductListing("Numeral_" + i, p);
            }
 
            // Add some more items manually.
            p = new ProductListing
            {
                Name = "1 token",
                ProductId = "1 token",
                ProductType = Windows.ApplicationModel.Store.ProductType.Consumable,
                Keywords = new string[] { "image" },
                Description = "An image",
                FormattedPrice = "1.0",
                Tag = string.Empty
            };
            MockIAP.AddProductListing("ReadAll", p);

            //FetchProducts();

            //DispatchCommandResult(new PluginResult(PluginResult.Status.OK));
#endif
*/
            inited = true;

            DispatchCommandResult(new PluginResult(PluginResult.Status.OK));

        }

        public static string SerializeJSon<T>(T t)
        {
            MemoryStream stream = new MemoryStream();
            DataContractJsonSerializer ds = new DataContractJsonSerializer(typeof(T));
            DataContractJsonSerializerSettings s = new DataContractJsonSerializerSettings();
            ds.WriteObject(stream, t);

            string jsonString = Encoding.UTF8.GetString(stream.ToArray(), 0, (int)stream.Length);
            stream.Close();

            return jsonString;
        }

        public async void ListProducts(string options = "")
        {
            ListingInformation listing = null;
            List<ProductListing> productListings;

            try
            {
                listing = await Store.CurrentApp.LoadListingInformationAsync();
                
            }
            catch(Exception e)
            {
                DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, e.Message));
            }

            if (listing != null)
            {
                productListings = listing.ProductListings.Values.ToList();

                /*
                    Succeed to list products..............
                */
                List<Product> prods = new List<Product>();

                


                foreach (ProductListing prod in productListings)
                {
                    ProductLicense license = Store.CurrentApp.LicenseInformation.ProductLicenses[prod.ProductId];
                    //ListingInformation products = await CurrentApp.LoadListingInformationByProductIdsAsync(new[] { InAppProductKey });

                    int state = 1;

                    ProductLicense productLicense = null;

                    bool productStatus = Store.CurrentApp.LicenseInformation.ProductLicenses[prod.ProductId].IsActive;

                    if (productStatus)
                        state = 2;

                    prods.Add(new Product(prod.Name, prod.ProductId, prod.FormattedPrice, state));
                }

                string jsonString = SerializeJSon<List<Product>>(prods);

                DispatchCommandResult(new PluginResult(PluginResult.Status.OK, jsonString));
            }

            DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, "No products!"));


            //Purchases.ItemsSource = productListings;
        }

        public void PurchaseProduct(string options)
        {
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                // attach a backbutton listener to the view and dim it a bit
                //CordovaView cView = getCordovaView();
                PurchaseProductAsync(options);
            });
        }


        public async void PurchaseProductAsync(string options)
        {
            string productId = JSON.JsonHelper.Deserialize<string[]>(options)[0];

            try
            {
                // Kick off purchase; don't ask for a receipt when it returns
                
                // attach a backbutton listener to the view and dim it a bit
                //CordovaView cView = getCordovaView();
                await Store.CurrentApp.RequestProductPurchaseAsync(productId, false);

                ProductLicense productLicense = null;
                if (Store.CurrentApp.LicenseInformation.ProductLicenses.TryGetValue(productId, out productLicense))
                {
                    if (productLicense.IsActive)
                    {
                        //MessageBox.Show("Product purchased");
                        // add GeekPoints to membership
                        //await Membership.UpdateGeekPointsBalance(100);
                        // notify marketplace that product has been delivered
                        Store.CurrentApp.ReportProductFulfillment(productId);

                        //string receiptXml = await CurrentApp.GetProductReceiptAsync("PremiumVersion");
                        // reload membership to update UI
                        //this.Membership = App.MembershipRepository.LoadMembership();
                        //return;
                        DispatchCommandResult(new PluginResult(PluginResult.Status.OK, "Succeed to purchase!"));
                    }
                }

                // Now that purchase is done, give the user the goods they paid for
                // (DoFulfillment is defined later)
                // DoFulfillment();
                DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, "Product not found!"));

            }
            catch (Exception ex)
            {
                // When the user does not complete the purchase (e.g. cancels or navigates back from the Purchase Page), an exception with an HRESULT of E_FAIL is expected.
                DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, "Failed to purchase! " + productId + "  " + ex.Message));
            }
        }
    }
}