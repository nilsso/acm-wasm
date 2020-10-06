#![feature(bool_to_option)]
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use web_sys::console;

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
pub fn valid_b(a: u64) -> String {
    let list: String = if a > 1 {
        "Something!".to_owned()
    //let q = a * a - a;
    //acm::divisors(q)
    //.into_iter()
    //.filter_map(|d| (a <= d).then(|| d.to_string()))
    //.collect::<Vec<String>>()
    //.join(",")
    } else {
        "1,2,3,4,5,\\ldots".to_owned()
    };
    format!(r"$b\in\{{ {} \}}$", list)
}

use acm::ArithmeticCongruenceMonoid as ACM;

// WARNING: Probably only works for a=4 and b=6 for now
fn clasify_n(a: u64, b: u64, n: u64) -> Option<String> {
    if n % a == 0 {
        if n % (a * b) == (a * a) {
            Some("$[16]_{24}$".to_owned())
        } else if (n / a) % b == 1 {
            Some("$[4]_6 [5]_6 [5]_6$".to_owned())
        } else {
            None
        }
    } else {
        None
    }
}

#[derive(Serialize, Deserialize)]
pub struct DataRow {
    pub i: usize,
    pub e: u64,
    //pub factorizations: Vec<Vec<u64>>,
    pub atomic: bool,
    pub classification: Option<String>,
    pub error: bool,
}

#[wasm_bindgen]
pub fn acm_data(a: u64, b: u64, l: u64) -> JsValue {
    let mut acm = ACM::new(a, b).unwrap();

    let data: Vec<DataRow> = acm
        .n_elements(l, a)
        .into_iter()
        .enumerate()
        .map(|(i, e)| {
            let fs = acm.factorize(e).clone();
            let atomic = acm.atomic(e);
            let classification = if !atomic { clasify_n(a, b, e) } else { None };
            let error = !atomic && classification.is_none();
            DataRow {
                i: i,
                e: e as u64,
                //factorizations: fs,
                atomic,
                classification,
                error,
            }
        })
        .collect();

    JsValue::from_serde(&data).unwrap()
}

#[derive(Serialize, Deserialize)]
pub struct StudyData {
    pub elements: Vec<u64>,
    pub primes: Vec<u64>,
}

const L: u64 = 10;

#[wasm_bindgen]
pub fn acm_study(a: u64, b: u64) -> JsValue {
    use num::integer::gcd;
    use primal_sieve::Primes;

    let acm = ACM::new(a, b).unwrap();

    let elements: Vec<u64> = acm.n_elements(L, a);

    let primes = Primes::all()
        .filter_map(|p| {
            let p = p as u64;
            (gcd(p as u64, b) == 1).then_some(p)
        })
        .take(10)
        .collect();

    let data = StudyData { elements, primes };

    JsValue::from_serde(&data).unwrap()
}
