import API_URL from "./api";
export const apiFetch=async(url,dispatch,token,meth,data,login,logout)=>{
     const options = {
    method: meth,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  };

 
  if (data && meth !== "GET" && meth !== "HEAD") {
    options.body = JSON.stringify(data);
  }

  let res = await fetch(url, options);

    if(res.status===401){
        const refershRes=await fetch(`${API_URL}/refreshToken`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include",
        });

       
let res2;
        if(refershRes.ok){
 const refdata=await refershRes.json();
 dispatch(login({
    userData:refdata.resUser,
    accessToken:refdata.accessToken,
 }));

   res2=await fetch(url,{
        method:meth,
        body:JSON.stringify(data),

        headers:{
            Authorization:`Bearer ${refdata.accessToken}`,
          "Content-Type": "application/json"  
        },
        credentials:"include"

    });


        }else{
            dispatch(logout());
            window.location.href="/login";
        }
        return res2;
    }
        return res
}
    