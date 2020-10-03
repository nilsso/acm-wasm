#![feature(bool_to_option)]
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
//use web_sys::console;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // Your code goes here!
    //console::log_1(&JsValue::from_str("Hello world!"));

    Ok(())
}

#[wasm_bindgen]
pub fn valid_b(a: u32) -> String {
    let list: String = if a > 1 {
        let q = a * a - a;
        acm::divisors(q)
            .into_iter()
            .filter_map(|d| (a <= d).then(|| d.to_string()))
            .collect::<Vec<String>>()
            .join(",")
    } else {
        "1,2,3,4,5,\\ldots".to_owned()
    };
    format!(r"$b\in\{{ {} \}}$", list)
}

use acm::ArithmeticCongruenceMonoid as ACM;

#[wasm_bindgen]
pub fn acm_elements(a: u32, b: u32, l: u32) -> Option<Vec<u32>> {
    if let Ok(acm) = ACM::new(a, b) {
        //if true {
        //Some(vec![1, 2, 3])
        Some(acm.n_elements(l, a))
    } else {
        None
    }
}

//#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct DataRow {
    pub i: usize,
    pub e: u32,
    pub factorizations: Vec<Vec<u32>>,
    pub atomic: bool,
}

#[wasm_bindgen]
pub fn acm_data(a: u32, b: u32, l: u32) -> JsValue {
    let mut acm = ACM::new(a, b).unwrap();

    let data: Vec<DataRow> = acm
        .n_elements(l, a)
        .into_iter()
        .enumerate()
        .map(|(i, e)| {
            let fs = acm.factorize(e).clone();
            let atomic = acm.atomic(e);
            DataRow {
                i: i,
                e: e as u32,
                factorizations: fs,
                atomic,
            }
        })
        .collect();

    JsValue::from_serde(&data).unwrap()
}

#[derive(Serialize, Deserialize)]
pub struct StudyData {
    pub elements: Vec<u32>,
    pub primes: Vec<u32>,
}

const L: u32 = 10;

#[wasm_bindgen]
pub fn acm_study(a: u32, b: u32) -> JsValue {
    use num::integer::gcd;
    use primal_sieve::Primes;

    let mut acm = ACM::new(a, b).unwrap();

    let elements: Vec<u32> = acm.n_elements(L, a);

    let primes = Primes::all()
        .filter_map(|p| {
            let p = p as u32;
            (gcd(p as u32, b) == 1).then_some(p)
        })
        .take(10)
        .collect();

    let data = StudyData { elements, primes };

    JsValue::from_serde(&data).unwrap()
}
